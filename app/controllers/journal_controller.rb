class JournalController < ApplicationController

    def index
        user = User.find(params["user_id"])
        render json: user.journal.to_json(
            include: :journal_entries
        )
    end


    def show
    end

    
    def create
        entry = Journal.create(journal_params)
        journals = Journal.all
        render json: journals.to_json()
    end


    def update
        entry = Journal.find_by(id: journal_params["id"])
        entry.update(journal_params)
        journals = Journal.all
        render json: journals.to_json()
    end


    def destroy
        entry = Journal.find_by(id: journal_params["id"])
        day = entry.day
        entry.delete
        render json: day.to_json(
            include: [
                :events,
                :goals,
                :tracker_days,
                :journal
            ]
        )
    end


    private

    def journal_params
        params.require(:journal).permit(:id, :day_id, :content)
    end

end
