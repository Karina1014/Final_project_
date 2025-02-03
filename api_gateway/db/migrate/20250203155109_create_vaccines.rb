class CreateVaccines < ActiveRecord::Migration[7.2]
  def change
    create_table :vaccines do |t|
      t.string :name
      t.string :description
      t.string :dose

      t.timestamps
    end
  end
end
