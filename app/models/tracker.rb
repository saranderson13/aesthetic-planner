class Tracker < ApplicationRecord

  has_many :tracker_lines
  has_many :tracker_days, through: :tracker_lines
  belongs_to :month

  validates :month_id, :kind, presence: true
  validates :kind, inclusion: { in: ["habit", "mood", "sleep"] }
  validate :validates_not_duplicate_kind
  
  
  private

  def validates_not_duplicate_kind
    if (!!self.month)
      if (self.month.trackers.map { |t| t.kind }.include?(self.kind))
        errors.add(:kind, "Cannot duplicate trackers within the assigned month.")
      end
    end
  end


end
