module Types
  class DogType < Types::BaseObject
    field :id, ID, null: false
    field :name_dog, String, null: false
    field :breed, String, null: false
    field :age, Integer, null: true
    field :gener, String, null: true
    field :image, String, null: true
  end
end
