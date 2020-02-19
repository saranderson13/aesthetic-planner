class CreateJournals < ActiveRecord::Migration[6.0]
  def change
    create_table :journals do |t|
      t.references :day, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
