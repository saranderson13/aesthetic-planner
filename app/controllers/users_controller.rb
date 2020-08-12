class UsersController < ApplicationController

    def index
        @users = User.all
        if !!@users
            render json: @users.to_json()
        else
            render json: {
                status: 500,
                errors: ['no users found']
            }
        end
    end

    
    def show
        @user = User.all.find(params["id"])
        if !!@user
            render json: @user.to_json(
                include: json_include()
            )
        else
            render json: {
                status: 500, 
                errors: ['user not found']
            }
        end
    end


    def create
        @user = User.new(user_params)
        if @user.valid?
            @user.save

            # Create user's journal
            @user.create_journal()

            # Create user's habit trackers
            months = Month.all
            months.each do |mo|
                h = Tracker.create(month_id: mo.id, kind: "habit", user: @user)
                # htl = TrackerLine.create(tracker: h, name: "Example Line")

                m = Tracker.create(month_id: mo.id, kind: "mood", user: @user)
                mtl = TrackerLine.create(tracker: m, name: "mood line")

                s = Tracker.create(month_id: mo.id, kind: "sleep", user: @user)
                stl = TrackerLine.create(tracker: s, name: "sleep line")

                days = mo.days()
                days.each do |d|
                    # TrackerDay.create(tracker_line: htl, day: d)
                    TrackerDay.create(tracker_line: mtl, day: d)
                    TrackerDay.create(tracker_line: stl, day: d)
                end
            end

            @user.save
            login!
            render json: {
                logged_in: true,
                user_info: @user.to_json()
            }
        else
            render json: {
                status: 500,
                errors: @user.errors.messages
            }
        end
    end

    
    def update

    end


    def destroy

    end


    private

    def user_params
        params.require(:user).permit(:user_id, :email, :password, :password_confirmation, :username, :name)
    end

    def json_include
        return [
            :events,
            :goals,
            # :trackers,
            :journal
        ]
    end

end
