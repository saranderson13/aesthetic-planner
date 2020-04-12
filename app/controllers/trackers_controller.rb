class TrackersController < ApplicationController

    def index 
        trackers = Tracker.all
        render json: trackers.to_json(
            include: json_include()
        )
    end


    def show
        tracker = Tracker.find_by(id: params["id"])
        render json: tracker.to_json(
            include: json_include()
        )
    end


    def update
        tracker = Tracker.find_by(id: tracker_params["id"])
        tracker.update(tracker_params)
        trackers = Tracker.all
        render json: trackers.to_json(
            include: json_include()
        )
    end


    private

    def tracker_params
        params.require(:tracker).permit(:id, :month_id, :kind)
    end

    def json_include
        return {
            tracker_lines: { include: :tracker_days }
        }
    end

end
