class TrackerDaysController < ApplicationController

    def update
        t_days = TrackerDays.find_by(id: t_days_params["id"])
        t_days.update(t_days_params)
        trackers = Tracker.all
        render json: trackers.to_json()
    end


    private

    def t_days_params
        params.require(:tracker_day).permit(:id, :tracker_line_id, :day_id, :complete, :color, :duration)
    end

end