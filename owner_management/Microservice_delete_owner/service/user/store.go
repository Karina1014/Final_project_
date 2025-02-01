package user

import (
	"database/sql"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

func (s *Store) DeleteOwner(idCard string) error {
	_, err := s.db.Exec("DELETE FROM owner WHERE id_card=?", idCard)
	return err
}
