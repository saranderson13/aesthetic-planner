class MonthsController < ApplicationController

    def index
        months = Month.all
        render json: months.to_json(
            include: json_include()
        )
    end


    def show
        month = Month.find_by(id: params["id"])
        render json: month.to_json(
            include: json_include()
        )
    end

    def monthTrackers

        user = User.find(params["user_id"])
        month = Month.find(params["month_id"])
        trackers = user.trackers.select { |t| t.month === month }

        render json: trackers.to_json(
            include: {
                tracker_lines: { include: :tracker_days }
            }
        )

    end


    private

    def json_include
        return [
            :days,
            :trackers,
            :events,
            :goals,
            :holidays
        ]
    end

end
