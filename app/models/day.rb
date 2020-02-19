class Day < ApplicationRecord

  has_many :events
  # has_one :journal
  # has_one :trackable_day
  # has_many :goals, as: :goalable
  belongs_to :week

end
