class Year < ApplicationRecord

    has_many :months, dependent: :destroy
    # has_many :weeks, through: :months
    # has many :goals, as :goalable

end
