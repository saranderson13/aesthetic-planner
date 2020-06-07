const journalReducer = (
    state = {
        journal: null,
        entries: [],
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
                    loadingJournal: false 
                }

            default:
                return state;

        }
    }


export default journalReducer