class AddUserColumnToJournals < ActiveRecord::Migration[6.0]
  def change
    add_reference :journals, :user, index: true
  end
end
