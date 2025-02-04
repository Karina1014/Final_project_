module Types
  class DogType < Types::BaseObject
    validates :name_dog, presence: true, length: { maximum: 100 }
    validates :breed, presence: true, length: { maximum: 100 }
    validates :age, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
    validates :gener, presence: true, inclusion: { in: [ "male", "female" ], message: "%{value} is not a valid gender" }
    validates :image, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp, message: "must be a valid URL" }
  end
end
