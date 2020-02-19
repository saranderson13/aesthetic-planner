class Month < ApplicationRecord

  has_many :weeks, dependent: :destroy
  has_many :days, through: :weeks
  has_many :events, through: :days
  has_many :goals, as: :goalable
  # has_many :trackers
  belongs_to :year
  
end
