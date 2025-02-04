class CreateDogs < ActiveRecord::Migration[7.2]
  def change
    create_table :dogs do |t|
      t.string :nameDog
      t.string :breed
      t.integer :age
      t.string :gener
      t.binary :image

      t.timestamps
    end
  end
end
