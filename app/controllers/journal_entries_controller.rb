class JournalEntriesController < ApplicationController

    # AUTHORIZATION CHECK
    # - Make sure journal belongs to user


    def create
        # Need journal_id, day_id, content

        # Get current user from session
        # Get journal from current user
        binding.pry
        
        new_entry = current_user.journal.journal_entries.build(entry_params)

        if new_entry.valid?
            new_entry.save

            recent_entries = current_user.journal.recent_entries

            render json: current_user.journal.to_json(
                include: [ 
                    :journal_entries,
                    :recent_entries 
                ]
            )
        else 
            # Throw error
        end
    end


    def update
        entry = JournalEntry.find(entry_params["id"])

        if (current_user.journal === entry.journal) 
            entry.update(entry_params)
            
            recent_entries = current_user.journal.recent_entries

            render json: current_user.journal.to_json(
                include: [ 
                    :journal_entries,
                    :recent_entries 
                ]
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
