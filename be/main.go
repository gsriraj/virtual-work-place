package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/srirajg/virtual-work-place/db"
	"github.com/srirajg/virtual-work-place/redis"
	"github.com/srirajg/virtual-work-place/routes"
)

func main() {
	log.Println("Server will start at http://localhost:8008/")

	godotenv.Load(".env")

	db.ConnectDatabase()
	redis.InitRedis()

	route := mux.NewRouter()

	routes.Approutes(route)

	corsWrapper := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST"},
		AllowedHeaders: []string{"Content-Type", "Origin", "Accept", "*"},
	})

	log.Fatal(http.ListenAndServe(":8008", corsWrapper.Handler(route)))
}
