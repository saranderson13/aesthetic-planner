class TrackerDaysController < ApplicationController

    def update
        tracker_day = TrackerDay.find_by(id: t_days_params["id"])
        tracker_day.update(t_days_params)
        monthTrackers = tracker_day.user.list_trackers_in_month(tracker_day.month_id)

        render json: monthTrackers.to_json(
            include: {
                :tracker_lines => { include: :tracker_days }
            }
        )
    end


    private

    def t_days_params
        params.require(:tracker_day).permit(:id, :tracker_line_id, :day_id, :complete, :color, :duration)
    end

    def json_include
        return {
            tracker_lines: { include: :tracker_days }
        }
    end

end