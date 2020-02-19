class CreateTrackerLines < ActiveRecord::Migration[6.0]
  def change
    create_table :tracker_lines do |t|
      t.references :tracker, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
