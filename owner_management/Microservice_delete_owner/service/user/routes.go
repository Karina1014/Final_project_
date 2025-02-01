package user

import (
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
	router.HandleFunc("/deleteOwners/{id_card}", h.deleteOwner).Methods("DELETE")
}

func (h *Handler) deleteOwner(w http.ResponseWriter, r *http.Request) {
	idCard := mux.Vars(r)["id_card"]
	h.store.DeleteOwner(idCard)
	w.WriteHeader(http.StatusNoContent)
}
