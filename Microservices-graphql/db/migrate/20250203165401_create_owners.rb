class CreateOwners < ActiveRecord::Migration[7.2]
  def change
    create_table :owners do |t|
      t.string :id_card
      t.string :firstName
      t.string :lastName
      t.string :address
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
