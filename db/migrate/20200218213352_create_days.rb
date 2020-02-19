class CreateDays < ActiveRecord::Migration[6.0]
  def change
    create_table :days do |t|
      t.references :week, null: false, foreign_key: true
      t.date :date

      t.timestamps
    end
  end
end
