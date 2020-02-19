class TrackerDay < ApplicationRecord
  belongs_to :tracker_line
  belongs_to :day
end
