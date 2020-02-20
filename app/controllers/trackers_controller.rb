class TrackersController < ApplicationController

    def index 
        trackers = Tracker.all
        render json: trackers.to_json()
    end


    def update
        tracker = Tracker.find_by(id: tracker_params["id"])
        tracker.update(tracker_params)
        trackers = Tracker.all
        render json: trackers.to_json()
    end


    private

    def tracker_params
        params.require(:tracker).permit(:id, :month_id, :kind)
    end

end
