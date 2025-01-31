package user

import (
	"encoding/json"
	"net/http"

	"example.com/mo/types"
	"github.com/gorilla/mux"
)

type Handler struct {
	store types.OwnerStore
}

func NewHandler(store types.OwnerStore) *Handler {
	return &Handler{store: store}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/createOwner", h.createOwner).Methods("POST")
}

func (h *Handler) createOwner(w http.ResponseWriter, r *http.Request) {
	var owner types.Owner
	json.NewDecoder(r.Body).Decode(&owner)
	h.store.CreateOwner(owner)
	w.WriteHeader(http.StatusCreated)
}
