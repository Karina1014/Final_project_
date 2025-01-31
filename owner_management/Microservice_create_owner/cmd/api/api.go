package api

import (
	"database/sql"
	"log"
	"net/http"

	"example.com/mo/service/user"
	"github.com/gorilla/mux"
)

// start the server and configure the routes.

type ApiServer struct {
	addr string
	db   *sql.DB
}

func NewApiServer(addr string, db *sql.DB) *ApiServer {
	return &ApiServer{
		addr: addr,
		db:   db,
	}
}

func (a *ApiServer) Start() error {
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api/v1").Subrouter()

	OwnerStore := user.NewStore(a.db)
	userHandler := user.NewHandler(OwnerStore)
	userHandler.RegisterRoutes(subrouter)

	log.Println("Starting server on", a.addr)

	return http.ListenAndServe(a.addr, router)
}
