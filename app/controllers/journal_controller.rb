class JournalController < ApplicationController

    def index
        recent_entries = current_user.journal.recent_entries

        render json: current_user.journal.to_json(
            include: [ 
                :journal_entries,
                :recent_entries 
            ]
        )
    end

    
    def create
        entry = Journal.create(journal_params)
        journals = Journal.all
        render json: journals.to_json()
    end


    # def update
        # May bring back if settings are implemented for journals.
    # end


    def destroy
        journal = Journal.find_by(id: journal_params["id"])
        journal.delete
        render json: { message: "Journal has been deleted." }.to_json()
    end


    private

    def journal_params
        params.require(:journal).permit(:id, :user_id)
    end

end
