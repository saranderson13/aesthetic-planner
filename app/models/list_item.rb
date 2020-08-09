class ListItem < ApplicationRecord

  belongs_to :list

  validates :list_id, :name, presence: true
  validates :completed, inclusion: { in: [true, false] }

  def user
    return self.list.user
  end

end
