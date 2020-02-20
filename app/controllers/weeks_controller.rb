class WeeksController < ApplicationController

    def index
        weeks = Week.all
        render json: weeks.to_json(
            include: json_include()
        )
    end


    def show
        week = Week.find_by(id: params["id"])
        render json: week.to_json(
            include: json_include()
        )
    end


    private

    def json_include
        return [
            :days,
            :events,
            :goals
        ]
    end

end
