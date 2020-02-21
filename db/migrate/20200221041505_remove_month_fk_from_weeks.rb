class RemoveMonthFkFromWeeks < ActiveRecord::Migration[6.0]
  def change

    remove_column :weeks, :month_id, :integer

  end
end
