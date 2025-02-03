class Vaccine < ApplicationRecord
  validates :name, presence: true
end
