package structs

import (
	jwt "github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Company struct {
	ID      primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	Name    string             `bson:"name"`
	OwnerID string             `bson:"owner_id"`
	Phone   string             `bson:"phone" validate:"required,min=6"`
	Address string             `bson:"address"`
	City    string             `bson:"city"`
	State   string             `bson:"state"`
	Country string             `bson:"country"`
	Zipcode int32              `bson:"zipcode"`
	Domain  string             `bson:"domain"`
}

type User struct {
	ID          primitive.ObjectID `bson:"_id" json:"id,omitempty"`
	FirstName   string             `bson:"first_name" validate:"required,min=2"`
	LastName    string             `bson:"last_name" validate:"required,min=1"`
	CompanyID   string             `bson:"business_id"`
	Email       string             `bson:"email" validate:"required,email"`
	Password    string             `bson:"password" validate:"required,min=8"`
	Designation string             `bson:"designation" validate:"required"`
	Phone       string             `bson:"phone" validate:"required,min=6"`
	// CompanyName string `bson: "company_name" validate:"required"`
	City    string `bson:"city" validate:"required"`
	State   string `bson:"state" validate:"required"`
	Country string `bson:"country" validate:"required"`
}

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
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
