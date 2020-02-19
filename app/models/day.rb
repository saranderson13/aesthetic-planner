class Day < ApplicationRecord

  has_many :events, dependent: :destroy
  has_many :goals, as: :goalable
  has_one :journal
  has_one :tracker_day
  belongs_to :week

end
