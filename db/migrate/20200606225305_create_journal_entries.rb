class CreateJournalEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :journal_entries do |t|
      t.references :journal, null: false, foreign_key: true
      t.references :day, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
