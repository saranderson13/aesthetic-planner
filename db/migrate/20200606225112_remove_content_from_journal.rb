class RemoveContentFromJournal < ActiveRecord::Migration[6.0]
  def change
    remove_column :journals, :content, :text
  end
end
