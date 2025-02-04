class Owner < ApplicationRecord
  validates :id_card, presence: true, length: { maximum: 50 }
  validates :firstName, :lastName, :address, presence: true, length: { maximum: 100 }
  validates :email, presence: true, length: { maximum: 100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, length: { maximum: 20 }, allow_blank: true
end
