class Year < ApplicationRecord

    has_many :months, dependent: :destroy
    has_many :weeks, dependent: :destroy
    has_many :days, dependent: :destroy
    has_many :events, through: :days
    has_many :goals, as: :goalable

    validates :year, :startDay, presence: true
    validates :year, :startDay, numericality: { only_integer: true }
    validates :year, uniqueness: true
    validates :startDay, inclusion: { in: [0, 1, 2, 3, 4, 5, 6] }
    validates :leap, inclusion: { in: [ true, false] }


    def holidays
        holidays = []
        self.days.each do |d|
            day_holidays = d.holidays
            day_holidays.each { |h| holidays.push(h) }
        end
        return holidays
    end

end
