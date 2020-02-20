class JournalsController < ApplicationController

    def index
        journals = Journal.all
        render json: journals.to_json()
    end


    def show
        journal = Journal.find_by(id: params["id"])
        render json: journal.to_json()
    end

    
    def create
        entry = Journal.create(journal_params)
        render json: entry.to_json()
    end


    def update
        entry = Journal.find_by(id: journal_params["id"])
        entry.update(journal_params)
        render json: entry.to_json()
    end


    def destroy
        entry = Journal.find_by(id: journal_params["id"])
        day = entry.day
        entry.delete
        render json: day.to_json()
    end


    private

    def journal_params
        params.require(:journal).permit(:id, :day_id, :content)
    end

end
