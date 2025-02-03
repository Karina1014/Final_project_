module Types
  class VaccineType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: true
    field :dose, String, null: true
  end
end
