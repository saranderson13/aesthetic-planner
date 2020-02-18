class YearsController < ApplicationController

    def index
        years = Year.all
        render json: years.to_json(
            include: :months
        )
    end

    def show
        year = Year.find_by(id: params["id"])
        render json: year.to_json()
    end

end
