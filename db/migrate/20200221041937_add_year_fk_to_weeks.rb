class AddYearFkToWeeks < ActiveRecord::Migration[6.0]
  def change

    add_reference :weeks, :year, index: true

  end
end
