class Tracker < ApplicationRecord

  belongs_to :month
  belongs_to :user
  has_many :tracker_lines, dependent: :destroy
  has_many :tracker_days, through: :tracker_lines

  validates :month_id, :user, :kind, presence: true
  validates :kind, inclusion: { in: ["habit", "mood", "sleep"] }
  validate :validates_not_duplicate_kind, on: :create
  
  
  private

  def validates_not_duplicate_kind
    user_trackers_in_month = self.user.list_trackers_in_month(self.month_id)
    existing_trackers_in_month = user_trackers_in_month.map { |t| t.kind }
    if ( existing_trackers_in_month.include?(self.kind) )
      errors.add(:kind, "Cannot duplicate trackers within the assigned month.")
    end
  end


end
