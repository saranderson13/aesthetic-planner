class RemoveColumnsFromJournals < ActiveRecord::Migration[6.0]
  def change
    remove_reference :journals, :day, index: true
    remove_column :journals, :content
  end
end
