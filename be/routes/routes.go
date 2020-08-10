package routes

import (
	"log"

	"github.com/gorilla/mux"
	"github.com/srirajg/virtual-work-place/handlers"
	"github.com/srirajg/virtual-work-place/jwt"
)

// Approutes - contains all apllication routes
func Approutes(route *mux.Router) {

	log.Println("Loading Routes...")

	route.HandleFunc("/signin", handlers.SignInUser).Methods("POST")
	route.HandleFunc("/signup", handlers.SignUpUser).Methods("POST")
	route.HandleFunc("/signout", handlers.SignOutUser).Methods("POST")

	route.HandleFunc("/company", handlers.CreateCompany).Methods("POST")
	route.Handle("/userDetails", jwt.IsAuthorized(handlers.GetUserDetails)).Methods("GET")
	route.HandleFunc("/token/refresh", jwt.Refresh).Methods("POST")

	log.Println("Routes are Loaded.")
}
