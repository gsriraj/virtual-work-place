package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/srirajg/virtual-work-place/db"
	"github.com/srirajg/virtual-work-place/jwt"
	"github.com/srirajg/virtual-work-place/structs"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

var validate *validator.Validate
var res structs.ResponseResult

// SignInUser Used for Signing in the Users
func SignInUser(w http.ResponseWriter, r *http.Request) {
	var userLogin structs.UserLogin
	var user structs.User
	validate = validator.New()

	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &userLogin)
	if err != nil {
		w.Write([]byte("Error decoding JSON."))
	}

	w.Header().Set("Content-Type", "application/json")

	collection := db.Client.Database("vwp").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	errCall := collection.FindOne(ctx, bson.D{}).Decode(&user)
	defer cancel()

	if errCall != nil {
		res.Error = "Invalid username"
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(res)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userLogin.Password))

	if err != nil {
		res.Error = "Invalid password"
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(res)
		return
	}

	ts, err := jwt.CreateToken(user.Email)

	if err != nil {
		res.Error = "Error while generating tokens,Try again"
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(res)
		return
	}

	saveErr := jwt.CreateAuth(user.Email, ts)
	if saveErr != nil {
		res.Error = "Error while saving token"
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(res)
		return
	}
	tokens := map[string]string{
		"access_token":  ts.AccessToken,
		"refresh_token": ts.RefreshToken,
	}

	json.NewEncoder(w).Encode(tokens)

}

// SignUpUser Used for Signing up the Users
func SignUpUser(w http.ResponseWriter, r *http.Request) {
	var user structs.User
	validate = validator.New()

	decoder := json.NewDecoder(r.Body)
	decoderErr := decoder.Decode(&user)
	defer r.Body.Close()

	if decoderErr != nil {
		w.Write([]byte("Error decoding JSON."))
	} else {
		fmt.Println("User", user.FirstName)
		err := validate.Struct(user)
		if err != nil {
			w.Write([]byte("Input validation error, please check you input."))
		} else {
			hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
			if err != nil {
				fmt.Println("error", err)
				w.Write([]byte("Error hashing password!"))
			}
			user.Password = string(hash)
			if err != nil {
				w.Write([]byte("Error! Please check your input."))
			} else {
				collection := db.Client.Database("vwp").Collection("users")

				ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

				_, databaseErr := collection.InsertOne(ctx, user)
				defer cancel()

				if databaseErr != nil {
					fmt.Println("error", databaseErr)
					w.Write([]byte("Error!"))
				} else {
					w.Header().Set("Content-Type", "application/json")
					w.Write([]byte("Success! user registered!"))
				}
			}
		}
	}
}

// SignOutUser Used for Signing up the Users
func SignOutUser(w http.ResponseWriter, r *http.Request) {
	au, err := jwt.ExtractTokenMetadata(r)
	if err != nil {
		res.Error = "Unauthorized!"
		json.NewEncoder(w).Encode(res)
		return
	}
	deleted, delErr := jwt.DeleteAuth(au.AccessUuid)
	if delErr != nil || deleted == 0 {
		res.Error = "Unauthorized!"
		json.NewEncoder(w).Encode(res)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("Successfully signed out"))
}

// GetUserDetails Used for getting the user details using user token
func GetUserDetails(w http.ResponseWriter, r *http.Request) {
	// tokenAuth, err := jwt.ExtractTokenMetadata(r)
	// if err != nil {
	// 	res.Error = "Unauthorized!"
	// 	json.NewEncoder(w).Encode(res)
	// 	return
	// }
	// email, err := jwt.FetchAuth(tokenAuth)
	// if err != nil {
	// 	res.Error = "Unauthorized!"
	// 	json.NewEncoder(w).Encode(res)
	// 	return
	// }
	// fmt.Println("Email is ", email)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("User detailsssss!"))
}

// TestUserHandler used for testing user routes
var TestUserHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("You have access"))
})
