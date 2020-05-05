class TrackerLine < ApplicationRecord

  has_many :tracker_days, dependent: :destroy
  belongs_to :tracker

  validates :tracker_id, :name, presence: true
  validate :validate_line_count, on: :create

  def days
    self.tracker.month.days
  end

  private

  def validate_line_count
    # Max of one line per tracker if mood or sleep.
    if (!!self.tracker)
      errors.add(:base, "The tracker may not have more than one line") if (self.tracker.kind != "habit" && self.tracker.tracker_lines.count > 0)
    end
  end
  
end
