class Day < ApplicationRecord

  has_many :events, dependent: :destroy
  has_many :goals, as: :goalable
  has_many :tracker_days
  has_one :journal
  belongs_to :week

end
