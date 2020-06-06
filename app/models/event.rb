class Event < ApplicationRecord
  
  belongs_to :day
  belongs_to :user

  KINDS = ["timed", "untimed"]
  KIND_SUBKINDS = {
    timed: ["appointment"],
    untimed: [
      "task",
      "deadline",
      "all day",
      "birthday"
    ]
  }

  validates :day_id, :user, :kind, :subkind, :name, presence: true
  validates :kind, inclusion: { in: KINDS }
  validates :subkind, inclusion: { in: KIND_SUBKINDS.values.flatten }
  validate :validate_kind_subkind_compatibility, :validate_time_compatibility

  private

  def validate_kind_subkind_compatibility
    if (!!self.kind && !!self.subkind)

      # test timed event compatibility
      if (self.kind == "timed" && !KIND_SUBKINDS[:timed].include?(self.subkind))
        errors.add(:base, "Event type and subtype are incompatible.")
      end

      # test untimed event compatibility
      if (self.kind == "untimed" && !KIND_SUBKINDS[:untimed].include?(self.subkind))
        errors.add(:base, "Event type and subtype are incompatible.")
      end

    end
  end

  def validate_time_compatibility

    if (!!self.kind && self.kind == "timed")

      # validate presence and correct type if event is timed
      errors.add(:start, "Start time should be present for a timed event.") if (!self.start.present?)
      errors.add(:end, "End time should be present for a timed event.") if (!self.end.present?)

      # START TIME VALIDATIONS
      if (!!self.start)
        # validate that type is correct
        errors.add(:start, "Start time should be a time.") if (self.start.class != ActiveSupport::TimeWithZone)

        # validate day is the same as the times
        if(!!self.day_id && !!Day.find_by(id: self.day_id))
          errors.add(:start, "Time must match assigned day.") if (self.start.to_date != self.day.date)
        end
      end

      # END TIME VALIDATIONS
      if (!!self.end)
        # validate that type is correct
        errors.add(:end, "End time should be a time.") if (self.end.class != ActiveSupport::TimeWithZone)
    
        # validate day is the same as the times
        if(!!self.day_id && !!Day.find_by(id: self.day_id))
          errors.add(:end, "Time must match assigned day.") if (self.end.to_date != self.day.date)
        end
      end

      # validate that end time comes after start time.
      if (!!self.start && !!self.end)
        errors.add(:base, "Start time must be before end time.") if (self.start > self.end)
      end
    end
  end

end
