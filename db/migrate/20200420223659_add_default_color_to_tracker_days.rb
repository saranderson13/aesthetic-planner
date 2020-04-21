class AddDefaultColorToTrackerDays < ActiveRecord::Migration[6.0]
  def change
    change_column_default :tracker_days, :color, 'transparent'
  end
end
