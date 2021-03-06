class User < ApplicationRecord

    has_secure_password

    # ASSOCIATIONS
    has_many :goals, dependent: :destroy
    has_many :events, dependent: :destroy
    has_many :trackers, dependent: :destroy
    has_many :tracker_lines, through: :trackers
    has_many :lists, dependent: :destroy
    has_one :journal, dependent: :destroy
    has_many :journal_entries, through: :journal

    # VALIDATIONS
    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
    validates :admin, inclusion: {in: [true, false]}
    validates :password, confirmation: true, unless: -> { password.blank? }



    def list_trackers_in_month(month_id)
        return self.trackers.select { |t| t.month_id === month_id }
    end

end
