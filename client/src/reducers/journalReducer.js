const journalReducer = (
    state = {
        days: [],
        loadingDays: true
    }, action ) => {

        switch (action.type) {

            case 'LOAD_DAYS':
                return {
                    ...state,
                    days: [...state.days],
                    loadingDays: true
                }

            case 'RETURN_DATES':
                return {
                    ...state,
                    days: action.days,
                    loadingDays: false 
                }

            default:
                return state;

        }
    }


export default journalReducer