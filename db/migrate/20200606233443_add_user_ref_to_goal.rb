class AddUserRefToGoal < ActiveRecord::Migration[6.0]
  def change
    add_reference :goals, :user, index: true
  end
end
