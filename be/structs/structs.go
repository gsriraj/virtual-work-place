package structs

import (
	jwt "github.com/dgrijalva/jwt-go"
)

type Business struct {
	Name    string `bson:"name"`
	OwnerID string `bson:"owner_id"`
	Address string `bson:"address"`
	City    string `bson:"city"`
	State   string `bson:"state"`
	Country string `bson:"country"`
	Zipcode int32  `bson:"zipcode"`
	Domain  string `bson:"domain"`
}

type User struct {
	FirstName   string `bson:"first_name" validate:"required,min=2"`
	LastName    string `bson:"last_name" validate:"required,min=1"`
	BusinessID  string `bson:"business_id"`
	Email       string `bson:"email" validate:"required,email"`
	Password    string `bson:"password" validate:"required,min=8"`
	Designation string `bson:"designation" validate:"required"`
	City        string `bson:"city" validate:"required"`
	State       string `bson:"state" validate:"required"`
	Country     string `bson:"country" validate:"required"`
}

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

type Response struct {
	Message string `json:"message"`
}

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}

type TokenDetails struct {
	AccessToken  string
	RefreshToken string
	AccessUuid   string
	RefreshUuid  string
	AtExpires    int64
	RtExpires    int64
}

type AccessDetails struct {
	AccessUuid string
	Email      string
}

// import jwt "github.com/dgrijalva/jwt-go"

// ErrorResponse is struct for sending error message with code.
// type ErrorResponse struct {
// 	Code    int
// 	Message string
// }

// // SuccessResponse is struct for sending error message with code.
// type SuccessResponse struct {
// 	Code     int
// 	Message  string
// 	Response interface{}
// }

// // Claims is  a struct that will be encoded to a JWT.
// // jwt.StandardClaims is an embedded type to provide expiry time
// type Claims struct {
// 	Email string
// 	jwt.StandardClaims
// }

// // RegistationParams is struct to read the request body
// type RegistationParams struct {
// 	FirstName string `bson:"first_name"`
// 	LastName  string `bson:"last_name"`
// 	Email     string `bson:"email"`
// 	Password  string `bson:"password"`
// 	Gender    string `bson: "gender"`
// }

// // LoginParams is struct to read the request body
// type LoginParams struct {
// 	Email    string `json:"email"`
// 	Password string `json:"password"`
// }

// // SuccessfulLoginResponse is struct to send the request response
// type SuccessfulLoginResponse struct {
// 	Email     string
// 	AuthToken string
// }

// // UserDetails is struct used for user details
// type UserDetails struct {
// 	Name     string
// 	Email    string
// 	Password string
// }
