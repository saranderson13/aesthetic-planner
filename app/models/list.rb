class List < ApplicationRecord

    has_many :list_items

    validates :name, :checklist, presence: true
    validates :name, uniqueness: true
    validates :checklist, inclusion: { in: [true, false] }

end
