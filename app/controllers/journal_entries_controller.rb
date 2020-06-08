class JournalEntriesController < ApplicationController

    # AUTHORIZATION CHECK
    # - Make sure journal belongs to user


    def create
        # Need journal_id, day_id, content

        # Get current user from session
        # Make sure journal belongs to user

        new_entry = JournalEntry.new(entry_params)
        if new_entry.valid?
            new_entry.save
            
            journal = Journal.find(entry_params["journal_id"])
            render json: journal.to_json(
                include: :journal_entries
            )
        else 
            # Throw error
        end
    end


    def update

    end


    def destroy

    end


    private

    def entry_params
        params.require(:journal_entry).permit(:journal_id, :day_id, :content)
    end

end
