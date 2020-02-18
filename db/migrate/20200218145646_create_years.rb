class CreateYears < ActiveRecord::Migration[6.0]
  def change
    create_table :years do |t|
      t.integer :year
      t.boolean :leap, default: false
      t.integer :startDay

      t.timestamps
    end
  end
end
