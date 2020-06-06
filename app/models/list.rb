class List < ApplicationRecord

    belongs_to :user
    has_many :list_items, dependent: :destroy

    validates :user, :name, presence: true
    validates :checklist, inclusion: { in: [true, false] }

end
