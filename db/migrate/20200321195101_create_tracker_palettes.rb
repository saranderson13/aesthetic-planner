class CreateTrackerPalettes < ActiveRecord::Migration[6.0]
  def change
    create_table :tracker_palettes do |t|
      t.string :color_1, default: "#E7E2B7"
      t.string :color_2, default: "#EBC2C8"
      t.string :color_3, default: "#E3C2E5"
      t.string :color_4, default: "#C3B7E7"
      t.string :color_5, default: "#9ECEE5"
      t.string :color_6, default: "#99DDBF"
      t.string :color_7, default: "#B9E8BF"

      t.timestamps
    end
  end
end
