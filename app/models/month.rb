class Month < ApplicationRecord

  # has_many :days, through: :weeks
  # has_many :events, through: :days
  has_many :goals, as: :goalable
  has_many :trackers
  belongs_to :year
  
  MONTHS = {
    1 => "January",
    2 => "February",
    3 => "March",
    4 => "April",
    5 => "May", 
    6 => "June",
    7 => "July",
    8 => "August",
    9 => "September",
    10 => "October",
    11 => "November",
    12 => "December"
  }

  MONTH_NUM_DAYS = {
    28 => [2],
    29 => [2],
    30 => [4, 6, 9, 11],
    31 => [1, 3, 5, 7, 8, 10, 12]
  }

  validates :year_id, :name, :number, :numDays, presence: true
  validates :number, :numDays, numericality: { only_integer: true }
  validates :name, inclusion: { in: MONTHS.values }
  validate :validate_name_num_match, :validate_monthNumDays
  validate :validate_monthNum, on: :create
  


  private

  def validate_name_num_match
    if (!!self.number && !!self.name)
      if (MONTHS[self.number] != self.name)
        errors.add(:name, "Name and number do not match.")
      end
    end
  end

  def validate_monthNum

    if (!!self.year_id && Year.find_by(id: self.year_id))
      year = Year.find_by(id: self.year_id)
      yearMonths = year.months.map { |m| m.number }

      if (yearMonths.include?(self.number))
        errors.add(:number, "Month already exists within that year.")
      end
    elsif (self.number && (self.number < 1 || self.number > 12) )
      errors.add(:number, "Month number must be between 1 & 12.")
    end

  end

  def validate_monthNumDays
    if(!!self.year_id && Year.find_by(id: self.year_id))

      year = Year.find_by(id: self.year_id)

      if( self.number == 2 && year.leap == false && self.numDays != 28 )
        errors.add(:numDays, "This month should have 28 days.")
      elsif ( self.number == 2 && year.leap && self.numDays != 29 )
        errors.add(:numDays, "This month should have 29 days.")
      elsif ( MONTH_NUM_DAYS[30].include?(self.number) && self.numDays != 30 )
        errors.add(:numDays, "This month should have 30 days.")
      elsif ( MONTH_NUM_DAYS[31].include?(self.number) && self.numDays != 31 )
        errors.add(:numDays, "This month should have 31 days.")
      end

    end
  end
  
end
