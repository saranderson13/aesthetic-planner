class Goal < ApplicationRecord

    belongs_to :goalable, polymorphic: true

    validates :goalable_type, :goalable_id, :content, presence: true

end
