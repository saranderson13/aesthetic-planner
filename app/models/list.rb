class List < ApplicationRecord

    has_many :list_items, dependent: :destroy

    validates :name, presence: true
    validates :name, uniqueness: true
    validates :checklist, inclusion: { in: [true, false] }

end
