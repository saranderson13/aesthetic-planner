class TrackerDay < ApplicationRecord

  belongs_to :tracker_line
  belongs_to :day

  validates :tracker_line_id, :day_id, presence: true
  validates :complete, inclusion: { in: [true, false] }
  validate :validate_not_duplicate_day, on: :create
  validate :validate_day_within_month, :validate_duration_if_sleep


  private

  def validate_not_duplicate_day
    tracker = self.tracker_line.tracker
    existing_dates = tracker.tracker_days.map { |d| d.day }
    errors.add(:day, "Day already has a cell.") if existing_dates.include?(self.day)
  end


  def validate_day_within_month
    tracker = self.tracker_line.tracker
    if (self.day.date.month != tracker.month.number || self.day.date.year != tracker.month.year.year)
      errors.add(:base, "Day outside of tracker range") 
    end
  end

  def validate_duration_if_sleep
    tracker = self.tracker_line.tracker
    if (tracker.kind == "sleep" && !!self.duration)
      errors.add(:duration, "Invalid duration") if (self.duration < 0 || self.duration > 24)
    end
  end

end
