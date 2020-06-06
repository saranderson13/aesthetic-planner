class User < ApplicationRecord

    has_secure_password

    # ASSOCIATIONS
    has_many :goals
    has_many :events
    has_many :trackers
    has_many :tracker_lines, through: :trackers
    has_many :lists
    has_one :journal

    # VALIDATIONS
    validates :email, presence: true, email: true, uniqueness: true
    validates :password, length: {in: 8...20}, presence: true, on: :create
    # validates :password_digest, presence: true
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
    validates :admin, presence: true, inclusion: {in: [true, false]}

end
