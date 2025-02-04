module Types
  class OwnerType < Types::BaseObject
    field :id, ID, null: false
    field :id_card, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :email, String, null: false
    field :phone, String, null: false
  end
end
