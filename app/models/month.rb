class Month < ApplicationRecord

  # has_many :weeks
  # has_many :days, through: :weeks
  # has_many :events, through: :days
  # has_many :trackers
  # has_many :goals, as :goalable
  belongs_to :year
  
end
