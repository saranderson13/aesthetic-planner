class AddDefaultDurationToTrackerDays < ActiveRecord::Migration[6.0]
  def change
    change_column_default :tracker_days, :duration, 0
  end
end
