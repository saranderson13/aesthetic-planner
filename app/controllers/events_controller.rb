class EventsController < ApplicationController

    def index
        events = Event.all
        render json: events.to_json()
    end


    def show
        event = Event.find_by(id: params["id"])
        render json: event.to_json()
    end


    def create
        event = Event.create(event_params)
        render json: event.day.to_json()
    end


    def update
        event = Event.find_by(id: event_params["id"])
        event.update(event_params)
        render json: event.day.to_json()
    end


    def destroy
        event = Event.find_by(id: event_params["id"])
        day = event.day
        event.delete
        render json: day.to_json()
    end



    private

    def event_params
        params.require(:event).permit(:id, :day_id, :kind, :subkind, :start, :end, :name)
    end

end
