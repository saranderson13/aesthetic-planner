class CreateHolidays < ActiveRecord::Migration[6.0]
  def change
    create_table :holidays do |t|
      t.references :day, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
