class Goal < ApplicationRecord

    belongs_to :goalable, polymorphic: true
    belongs_to :user

    validates :goalable_type, :goalable_id, :content, presence: true
    validates :goalable_type, inclusion: { in: ["Year", "Month", "Week", "Day"] }
    validates :user, presence: true
end
