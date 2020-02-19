class CreateTrackerDays < ActiveRecord::Migration[6.0]
  def change
    create_table :tracker_days do |t|
      t.references :tracker_line, null: false, foreign_key: true
      t.references :day, null: false, foreign_key: true
      t.boolean :complete, default: false
      t.string :color
      t.integer :duration

      t.timestamps
    end
  end
end
