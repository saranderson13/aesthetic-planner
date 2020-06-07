class DaysController < ApplicationController

    def index
        days = Day.all
        render json: days.to_json(
            include: json_include()
        )
    end

    def show
        day = Day.find_by(id: params["id"])
        render json: day.to_json(
            include: json_include()
        )
    end


    private 

    def json_include
        return [
            :events,
            :goals,
            :tracker_days,
            # :journal
        ]
    end
    
end
