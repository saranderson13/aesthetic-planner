class TrackerLine < ApplicationRecord

  has_many :tracker_days
  belongs_to :tracker
  
end
