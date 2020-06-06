class JournalEntry < ApplicationRecord

  belongs_to :journal
  belongs_to :day

  validates :journal, :day, presence: true
  validates :content, length: { maximum: 10000, 
    too_long: "Journal entry must not exceed %{count} characters." }

end
