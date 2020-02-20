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


    private

    def json_include
        return [
            :weeks,
            :trackers,
            :events,
            :goals
        ]
    end

end
