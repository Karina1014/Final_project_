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

func (s *Store) CreateOwner(owner types.Owner) error {
	_, err := s.db.Exec("INSERT INTO owner (id_card, firstName, lastName, address, email, phone) VALUES (?, ?, ?, ?, ?, ?)",
		owner.IDCard, owner.FirstName, owner.LastName, owner.Address, owner.Email, owner.Phone)
	return err
}
