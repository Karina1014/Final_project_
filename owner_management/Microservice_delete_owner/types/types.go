package types

type OwnerStore interface {
	DeleteOwner(idCard string) error
}

type Owner struct {
	IDCard    string `json:"id_card"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Address   string `json:"address"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
}
