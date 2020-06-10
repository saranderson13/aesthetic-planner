class JournalEntriesController < ApplicationController

    # AUTHORIZATION CHECK
    # - Make sure journal belongs to user


    def create
        # Need journal_id, day_id, content

        # Get current user from session
        # Get journal from current user

        user = User.find(4)
        journal = user.journal
        new_entry = journal.journal_entries.build(entry_params)

        if new_entry.valid?
            new_entry.save

            render json: journal.to_json(
                include: :journal_entries
            )
        else 
            # Throw error
        end
    end


    def update
        user = User.find(4)
        journal = user.journal
        entry = JournalEntry.find(entry_params["id"])

        if (journal === entry.journal) 
            entry.update(entry_params)
            
            render json: journal.to_json(
                include: :journal_entries
            )
        else
            # Throw error
        end


    end


    # USERS WON'T BE ABLE TO DELETE THEIR JOURNAL ENTRIES, JUST RE-WRITE THEM.
    # def destroy
    #     entry = JournalEntry.find(entry_params["id"])
    #     entry.delete
    # end


    private

    def entry_params
        params.require(:journal_entry).permit(:id, :day_id, :content)
    end

end
