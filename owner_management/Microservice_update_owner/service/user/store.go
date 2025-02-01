package user

import (
	"database/sql"

	"example.com/mo/types"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

func (s *Store) UpdateOwner(idCard string, owner types.Owner) error {
	_, err := s.db.Exec("UPDATE owner SET firstName=?, lastName=?, address=?, email=?, phone=? WHERE id_card=?",
		owner.FirstName, owner.LastName, owner.Address, owner.Email, owner.Phone, idCard)
	return err
}
