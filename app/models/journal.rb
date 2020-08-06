class Journal < ApplicationRecord

  belongs_to :user
  has_many :journal_entries, dependent: :destroy

  validates :user, presence: true


  def recent_entries
    self.journal_entries.last(3)
  end

end
