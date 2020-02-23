class AddYearFkToDays < ActiveRecord::Migration[6.0]
  def change

    add_reference :days, :year, index: true

  end
end
