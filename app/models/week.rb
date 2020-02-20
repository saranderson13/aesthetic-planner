class Week < ApplicationRecord

  has_many :days, dependent: :destroy
  has_many :events, through: :days
  has_many :goals, as: :goalable
  belongs_to :month

  validates :month_id, :start_date, :end_date, presence: true
  validate :validate_start_end_dates


  private

  def validate_start_end_dates
    # validate that both are of the Date type
    errors.add(:start_date, "Start date must be a date.") if (!!self.start_date && self.start_date.class != Date)
    errors.add(:end_date, "End date must be a date.") if (!!self.end_date && self.end_date.class != Date)

    # validate that start date is a Monday, and end date is a Sunday
    errors.add(:start_date, "Start date must be a Monday.") if (!!self.start_date && self.start_date.class == Date && self.start_date.wday != 1)
    errors.add(:end_date, "End date must be a Sunday.") if (!!self.end_date && self.end_date.class == Date && self.end_date.wday != 0)

    # validations that require pre-checking of date existences and types
    if (!!self.start_date && self.start_date.class == Date && !!self.end_date && self.end_date.class == Date)

      # validate that start date comes before end date
      if(self.end_date <= self.start_date)
        errors.add(:start_date, "Start date must be before end date.") 
        errors.add(:end_date, "End date must be after start date.")
      end

      # validate that the dates are 7 days apart
      if ((self.end_date - self.start_date).to_i != 6)
        errors.add(:start_date, "Week must be 7 days long.")
        errors.add(:end_date, "Week must be 7 days long.")
      end

      # validate that at least 1 day of the week is within the month
      if(self.start_date.month == self.month_id || self.end_date.month == self.month_id)
        errors.add(:start_date, "At least one day of the week must be within the assigned month.")
        errors.add(:end_date, "At least one day of the week must be within the assigned month.")
      end
    end

    # validate that a week does not already exist with that start date
    if(!!self.start_date && self.start_date.class == Date)
      allWeeks = Week.all.map { |w| w.start_date }
      if (allWeeks.include?(self.start_date))
        errors.add(:start_date, "A week with that start date already exists.")
      end
    end

  end

end
