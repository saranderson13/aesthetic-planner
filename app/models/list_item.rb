class ListItem < ApplicationRecord

  belongs_to :list

  validates :list_id, :name, :completed, presence: true
  validates :completed, inclusion: { in: [true, false] }

end
