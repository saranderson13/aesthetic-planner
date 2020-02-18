class DaysController < ApplicationController

    def index
        days = Day.all
        render json: days.to_json(
            include: :events
        )
    end

    def show
        day = Day.find_by(id: params["id"])
        render json: day.to_json(
            include: :events
        )
    end
    
end
