class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :day, null: false, foreign_key: true
      t.string :kind
      t.string :subkind
      t.time :start, default: nil
      t.time :end, default: nil

      t.timestamps
    end
  end
end
