class AddUserRefToTracker < ActiveRecord::Migration[6.0]
  def change
    add_reference :trackers, :user, index: true
  end
end
