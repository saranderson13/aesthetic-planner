const journalReducer = (
    state = {
        journals: [],
        loadingJournals: false
    }, action ) => {

        switch (action.type) {

            case 'LOAD_JOURNALS':
                return {
                    ...state,
                    journals: [...state.journals],
                    loadingJournals: true
                }

            case 'ADD_JOURNALS':
                return {
                    ...state,
                    journals: action.journals,
                    loadingJournals: false 
                }

            default:
                return state;

        }
    }


export default journalReducer