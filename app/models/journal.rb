class Journal < ApplicationRecord

  belongs_to :user
  has_many :journal_entries, dependent: :destroy

  validates :user, presence: true

end
