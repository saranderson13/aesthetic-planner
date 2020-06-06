class User < ApplicationRecord
    # ASSOCIATIONS
    has_many :goals
    has_many :events
    has_many :trackers
    has_many :tracker_lines, through: :trackers
    has_many :lists
    has_one :journal

    # VALIDATIONS
    validates :email, presence: true, email: true, uniqueness: true
    validates :password_digest, presence: true
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
    validates :admin, presence: true, inclusion: {in: [true, false]}

end
