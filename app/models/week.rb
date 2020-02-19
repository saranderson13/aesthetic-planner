class Week < ApplicationRecord

  has_many :days, dependent: :destroy
  has_many :events, through: :days
  has_many :goals, as: :goalable
  belongs_to :month

end
