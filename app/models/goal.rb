class Goal < ApplicationRecord

    belongs_to :goalable, polymorphic: true

end
