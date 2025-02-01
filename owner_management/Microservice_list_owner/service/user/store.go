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

func (s *Store) GetAllOwners() ([]types.Owner, error) {
	rows, err := s.db.Query("SELECT id_card, firstName, lastName, address, email, phone FROM owner")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var owners []types.Owner
	for rows.Next() {
		var owner types.Owner
		if err := rows.Scan(&owner.IDCard, &owner.FirstName, &owner.LastName, &owner.Address, &owner.Email, &owner.Phone); err != nil {
			return nil, err
		}
		owners = append(owners, owner)
	}
	return owners, nil
}
