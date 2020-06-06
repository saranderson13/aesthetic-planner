class Holiday < ApplicationRecord

  belongs_to :day

  validates :day, :name, presence: true

end
