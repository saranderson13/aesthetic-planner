class Tracker < ApplicationRecord

  has_many :tracker_lines
  has_many :tracker_days, through: :tracker_lines
  belongs_to :month

end
