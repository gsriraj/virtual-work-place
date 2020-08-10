package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/srirajg/virtual-work-place/db"
	"github.com/srirajg/virtual-work-place/structs"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CreateCompany Used for registering up the company
func CreateCompany(w http.ResponseWriter, r *http.Request) {
	var company structs.Company
	validate = validator.New()

	decoder := json.NewDecoder(r.Body)
	decoderErr := decoder.Decode(&company)
	company.ID = primitive.NewObjectID()
	defer r.Body.Close()

	if decoderErr != nil {
		w.Write([]byte("Error decoding JSON."))
	} else {
		err := validate.Struct(company)
		if err != nil {
			w.Write([]byte("Input validation error, please check you input."))
		} else {
			collection := db.Client.Database("vwp").Collection("company")

			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

			_, databaseErr := collection.InsertOne(ctx, company)

			defer cancel()

			if databaseErr != nil {
				fmt.Println("error", databaseErr)
				w.Write([]byte("Error!"))
			} else {
				w.Header().Set("Content-Type", "application/json")
				w.Write([]byte("Success! company registered!"))
			}

		}
	}
}
