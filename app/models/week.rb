class Week < ApplicationRecord

  has_many :goals, as: :goalable
  belongs_to :year

  validates :year_id, :start_date, :end_date, presence: true
  validate :validate_start_date_unique_in_year, on: :create
  validate :validate_start_end_dates


  def days 
    self.year.days.select { |d| d.date >= self.start_date && d.date <= self.end_date }
  end

  def events
    self.days().map { |d| d.events }.flatten
  end
  
  def holidays
    holidays = []
    self.days.each do |d|
      day_holidays = d.holidays
      day_holidays.each { |h| holidays.push(h) }
    end
    return holidays
  end

  private

  def validate_start_end_dates
    # validate that both are of the Date type
    errors.add(:start_date, "Start date must be a date.") if (!!self.start_date && self.start_date.class != Date)
    errors.add(:end_date, "End date must be a date.") if (!!self.end_date && self.end_date.class != Date)

    # validate that start date is a Monday, and end date is a Sunday
    errors.add(:start_date, "Start date must be a Monday.") if (!!self.start_date && self.start_date.class == Date && !self.start_date.monday?)
    errors.add(:end_date, "End date must be a Sunday.") if (!!self.end_date && self.end_date.class == Date && !self.end_date.sunday?)

    # validations that require pre-checking of date existences and types
    if (!!self.start_date && self.start_date.class == Date && !!self.end_date && self.end_date.class == Date)

      # validate that start date comes before end date
      if(self.end_date <= self.start_date)
        errors.add(:base, "Start date must be before end date.") 
      end

      # validate that the dates are 7 days apart
      if ((self.end_date - self.start_date).to_i != 6)
        errors.add(:base, "Week must be 7 days long.")
      end

      # validate that at least 1 day of the week is within the year
      if(self.start_date.year != self.year.year && self.end_date.year != self.year.year)
        errors.add(:base, "At least one day of the week must be within the assigned year.")
      end
    end
  end

  def validate_start_date_unique_in_year
    starts = self.year.weeks.map { |m| m.start_date }
    if (starts.include?(self.start_date))
      errors.add(:start_date, "Week already exists within the assigned year.")
    end
  end

end
