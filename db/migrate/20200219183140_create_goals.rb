class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.belongs_to :goalable, polymorphic: true
      t.text :content

      t.timestamps
    end
  end
end
