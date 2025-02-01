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
	router.HandleFunc("/listOwners", h.getAllOwners).Methods("GET")
}

func (h *Handler) getAllOwners(w http.ResponseWriter, r *http.Request) {
	owners, err := h.store.GetAllOwners()
	if err != nil {
		http.Error(w, "Error retrieving owners: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if len(owners) == 0 {
		http.Error(w, "No owners found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(owners)
}
