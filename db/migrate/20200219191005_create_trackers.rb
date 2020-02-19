class CreateTrackers < ActiveRecord::Migration[6.0]
  def change
    create_table :trackers do |t|
      t.references :month, null: false, foreign_key: true
      t.string :kind

      t.timestamps
    end
  end
end
