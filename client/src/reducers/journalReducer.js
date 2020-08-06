const journalReducer = (
    state = {
        journal: null,
        entries: [],
        recentEntries: [],
        loadingJournal: false
    }, action ) => {

        switch (action.type) {

            case 'LOAD_JOURNAL':
                return {
                    ...state,
                    loadingJournal: true
                }

            case 'ADD_JOURNAL':
                return {
                    ...state,
                    journal: action.journal,
                    entries: [...action.journal.journal_entries],
                    recentEntries: [...action.journal.recent_entries],
                    loadingJournal: false 
                }

            case 'CLEAR_JOURNAL':
                return {
                    ...state,
                    journal: null,
                    entries: [],
                    recentEntries: []
                }

            default:
                return state;

        }
    }


export default journalReducer