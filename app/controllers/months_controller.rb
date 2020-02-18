class MonthsController < ApplicationController

    def index
        months = Month.all
        render json: months.to_json()
    end

    def show
        month = Month.find_by(id: params["id"])
        render json: month.to_json()
    end

end
