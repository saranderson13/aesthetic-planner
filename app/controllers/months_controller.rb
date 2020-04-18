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
        month = Month.find_by(id: params["id"])
        render json: month.to_json(
            except: [:id, :year_id, :name, :number, :numDays, :created_at, :updated_at],
            include: { :trackers => {
                include: {
                    :tracker_lines => { include: :tracker_days }
                }
            }}
        )
    end


    private

    def json_include
        return [
            :days,
            :trackers,
            :events,
            :goals
        ]
    end

end
