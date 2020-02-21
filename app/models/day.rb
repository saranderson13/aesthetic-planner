class Day < ApplicationRecord

  has_many :events
  has_many :goals, as: :goalable
  has_many :tracker_days
  has_one :journal, dependent: :destroy
  belongs_to :week

  validates :week_id, :date, presence: true
  # validates :date, uniqueness: true
  validate :validate_day_within_week


  private

  def validate_day_within_week
    
    if(!!self.week_id && Week.find_by(id: self.week_id) && !!self.date)
      week = Week.find_by(id: self.week_id)
      
      # validate day falls within week
      if(self.date < week.start_date || self.date > week.end_date)
        errors.add(:date, "Date must be within the assigned week.")
      end
      
      # validate day is not duplicated within week
      dates_in_week = week.map { |d| d.date }
      if dates_in_week.include?(self.date)
        errors.add(:date, "Date must be unique within the assigned week")
      end

    end
  end

end
