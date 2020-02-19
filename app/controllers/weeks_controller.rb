class WeeksController < ApplicationController

    def index
        weeks = Week.all
        render json: weeks.to_json(
            include: :days
        )
    end

    def show
        week = Week.find_by(id: params["id"])
        render json: week.to_json(
            include: :days
        )
    end

end
