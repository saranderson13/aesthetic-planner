class Journal < ApplicationRecord

  belongs_to :day

  validates :day_id, :content, presence: true
  validates :content, length: { maximum: 3000, 
    too_long: "Journal entry must not exceed %{count} characters." }

end
