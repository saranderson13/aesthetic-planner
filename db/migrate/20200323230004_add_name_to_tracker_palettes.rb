class AddNameToTrackerPalettes < ActiveRecord::Migration[6.0]
  def change
    add_column :tracker_palettes, :name, :string, default: "Untitled"
  end
end
