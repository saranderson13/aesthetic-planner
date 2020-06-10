class JournalController < ApplicationController

    def index
        user = User.find(params["user_id"])
        render json: user.journal.to_json(
            include: :journal_entries
        )
    end


    # def show

    # end

    
    def create
        entry = Journal.create(journal_params)
        journals = Journal.all
        render json: journals.to_json()
    end


    # def update
    #     entry = Journal.find_by(id: journal_params["id"])
    #     entry.update(journal_params)
    #     journals = Journal.all
    #     render json: journals.to_json()
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