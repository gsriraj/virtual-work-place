package jwt

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/srirajg/virtual-work-place/redis"
	"github.com/srirajg/virtual-work-place/structs"
)

var ctx = context.Background()
var res structs.ResponseResult

func CreateToken(email string) (*structs.TokenDetails, error) {
	td := &structs.TokenDetails{}
	td.AtExpires = time.Now().Add(time.Minute * 15).Unix()
	td.AccessUuid = uuid.New().String()

	td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
	td.RefreshUuid = uuid.New().String()

	var err error
	// creating Access Token
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["email"] = email
	atClaims["access_uuid"] = td.AccessUuid
	atClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	td.AccessToken, err = at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return nil, err
	}
	//Creating Refresh Token
	rtClaims := jwt.MapClaims{}
	rtClaims["refresh_uuid"] = td.RefreshUuid
	rtClaims["email"] = email
	rtClaims["exp"] = td.RtExpires
	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	td.RefreshToken, err = rt.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil {
		return nil, err
	}
	return td, nil
}

func CreateAuth(email string, td *structs.TokenDetails) error {
	at := time.Unix(td.AtExpires, 0) //converting Unix to UTC(to Time object)
	rt := time.Unix(td.RtExpires, 0)
	now := time.Now()

	errAccess := redis.ClientRedis.Set(ctx, td.AccessUuid, email, at.Sub(now)).Err()
	if errAccess != nil {
		return errAccess
	}
	errRefresh := redis.ClientRedis.Set(ctx, td.RefreshUuid, email, rt.Sub(now)).Err()
	if errRefresh != nil {
		return errRefresh
	}
	return nil
}

// IsAuthorizes checks if uses has access
func IsAuthorized(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := TokenValid(r)
		if err != nil {
			res.Error = "Unauthorized!"
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(res)
			return
		}
	})
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func VerifyToken(r *http.Request) (*jwt.Token, error) {
	tokenString := ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func TokenValid(r *http.Request) error {
	token, err := VerifyToken(r)
	if err != nil {
		return err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return err
	}
	return nil
}

func ExtractTokenMetadata(r *http.Request) (*structs.AccessDetails, error) {
	token, err := VerifyToken(r)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		accessUuid, ok := claims["access_uuid"].(string)
		if !ok {
			return nil, err
		}
		email, ok := claims["email"].(string)
		if !ok {
			return nil, err
		}
		// if err != nil {
		// 	return nil, err
		// }
		return &structs.AccessDetails{
			AccessUuid: accessUuid,
			Email:      email,
		}, nil
	}
	return nil, err
}

func FetchAuth(authD *structs.AccessDetails) (string, error) {
	email, err := redis.ClientRedis.Get(ctx, authD.AccessUuid).Result()
	if err != nil {
		return "", err
	}
	return email, nil
}

func DeleteAuth(givenUuid string) (int64, error) {
	deleted, err := redis.ClientRedis.Del(ctx, givenUuid).Result()
	if err != nil {
		return 0, err
	}
	return deleted, nil
}

func Refresh(w http.ResponseWriter, r *http.Request) {
	mapToken := map[string]string{}
	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal([]byte(body), &mapToken)
	refreshToken := mapToken["refresh_token"]
	//verify the token
	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("REFRESH_SECRET")), nil
	})
	//if there is an error, the token must have expired
	if err != nil {
		res.Error = "Refresh token expired!"
		json.NewEncoder(w).Encode(res)
		return
	}
	//is token valid?
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		res.Error = "Token not valid!"
		json.NewEncoder(w).Encode(res)
		return
	}
	//Since token is valid, get the uuid:
	claims, ok := token.Claims.(jwt.MapClaims) //the token claims should conform to MapClaims
	if ok && token.Valid {
		refreshUuid, ok := claims["refresh_uuid"].(string) //convert the interface to string
		if !ok {
			res.Error = "Not processable entity"
			json.NewEncoder(w).Encode(res)
			return
		}
		email := claims["email"].(string)
		//Delete the previous Refresh Token
		deleted, delErr := DeleteAuth(refreshUuid)
		if delErr != nil || deleted == 0 { //if any goes wrong
			res.Error = "unauthorized"
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(res)
			return
		}
		//Create new pairs of refresh and access tokens
		ts, createErr := CreateToken(email)
		if createErr != nil {
			res.Error = "unauthorized"
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(res)
			return
		}
		//save the tokens metadata to redis
		saveErr := CreateAuth(email, ts)
		if saveErr != nil {
			res.Error = "unauthorized"
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(res)
			return
		}
		tokens := map[string]string{
			"access_token":  ts.AccessToken,
			"refresh_token": ts.RefreshToken,
		}
		json.NewEncoder(w).Encode(tokens)
	} else {
		res.Error = "refresh expired"
		json.NewEncoder(w).Encode(res)
	}
}
