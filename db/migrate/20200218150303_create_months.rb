class CreateMonths < ActiveRecord::Migration[6.0]
  def change
    create_table :months do |t|
      t.references :year, null: false, foreign_key: true
      t.string :name
      t.integer :number
      t.integer :numDays

      t.timestamps
    end
  end
end
