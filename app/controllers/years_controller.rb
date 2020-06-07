class YearsController < ApplicationController

    def index
        years = Year.all
        render json: years.to_json(
            include: json_include()
        )
    end


    def show
        year = Year.find_by(id: params["id"])
        render json: year.to_json(
            include: json_include()
        )
    end


    private

    def json_include
        return [
            :months,
            :goals,
            :holidays
        ]
    end

end
