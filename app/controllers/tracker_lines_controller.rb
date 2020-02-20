class TrackerLinesController < ApplicationController

    def create
        line = TrackerLine.create(t_line_params)
        trackers = Tracker.all
        render json: trackers.to_json()
    end


    def update
        line = TrackerLine.find_by(id: t_line_params["id"])
        line.update(t_line_params)
        trackers = Tracker.all
        render json: trackers.to_json()
    end


    def destroy
        line = TrackerLine.find_by(id: t_line_params["id"])
        line.delete
        trackers = Tracker.all
        render json: trackers.to_json()
    end


    private

    def t_line_params
        params.require(:tracker_line).permit(:id, :tracker_id, :name)
    end

end