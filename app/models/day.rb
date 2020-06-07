class Day < ApplicationRecord

  has_many :events
  has_many :holidays
  has_many :goals, as: :goalable
  has_many :tracker_days
  has_many :journal_entries
  belongs_to :year

  validates :year_id, :date, presence: true
  validates :date, uniqueness: true
  validate :validate_day_within_year


  private

  def validate_day_within_year
    
    if(!!self.year_id && Year.find_by(id: self.year_id) && !!self.date)
      year = Year.find_by(id: self.year_id)
      
      if(self.date.year != year.year)
        errors.add(:date, "Date must be within the assigned year.")
      end

    end
  end

end
