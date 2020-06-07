class HolidaysController < ApplicationController

    def index 

        if params["year_id"]
            y = Year.find(params["year_id"])
            render json: y.holidays.to_json()
        elsif params["month_id"]
            m = Month.find(params["month_id"])
            render json: m.holidays.to_json()
        elsif params["week_id"]
            w = Week.find(params["week_id"])
            render json: w.holidays.to_json()
        elsif params["day_id"]
            d = Day.find(params["day_id"])
            render json: d.holidays.to_json()
        end

    end

end
