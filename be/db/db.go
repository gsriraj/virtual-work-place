package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func ConnectDatabase() {
	log.Println("Database connecting...")

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		panic(err)
	}
	// defer client.Disconnect(ctx)

	Client = client
	Client.Database("vwp")

	// Client.Database.Collection("company")
	// Client.Database.collection("user")

	log.Println("Database Connected.")
}
