const controlsReducer = (
    state = {
        months: [],
        currentMonth: {},
        loading: false,
        days: [],
        loadingDays: true
    }, action ) => {
        
        switch (action.type) {
            case 'LOAD_MONTHS_FOR_WIDGET':
                return {
                    ...state,
                    months: [...state.months],
                    loading: true
                }

            case 'ADD_MONTHS_FOR_WIDGET':
                return {
                    ...state,
                    months: action.months,
                    currentMonth: action.months.find( m => m.number == (new Date().getMonth() + 1)),
                    loading: false
                }

            case 'LOAD_DAYS':
                return {
                    ...state,
                    days: [...state.days],
                    loadingDays: true
                }

            case 'RETURN_DAYS':
                return {
                    ...state,
                    days: action.days,
                    loadingDays: false 
                }

            default:
                return state
        }
    }

export default controlsReducer;