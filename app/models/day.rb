class Day < ApplicationRecord

  has_many :events, dependent: :destroy
  has_many :goals, as: :goalable
  # has_one :journal
  # has_one :trackable_day
  belongs_to :week

end
