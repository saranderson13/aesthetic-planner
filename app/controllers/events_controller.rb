class EventsController < ApplicationController

    def index
        events = Event.all
        render json: events.to_json()
    end

    def show
        event = Event.find_by(id: params["id"])
        render json: event.to_json()
    end

end
