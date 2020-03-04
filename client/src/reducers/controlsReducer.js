const controlsReducer = (
    state = {
        months: [],
        currentMonth: {},
        loading: false,
        days: [],
        loadingDays: true,
        currentDayId: null
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
                    currentMonth: action.months.find( m => m.number === (new Date().getMonth() + 1)),
                    loading: false
                }

            case 'LOAD_DAYS':
                return {
                    ...state,
                    days: [...state.days],
                    loadingDays: true
                }

            case 'RETURN_DAYS':
                const today = new Date()
                const todayDateString = today.getFullYear().toString() + "-" + ( today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1 ) + "-" + ( today.getDate() < 10 ? "0" + today.getDate() : today.getDate() )
                return {
                    ...state,
                    days: action.days,
                    loadingDays: false,
                    currentDayId: (action.days.find( d => d.date === todayDateString).id )
                }

            default:
                return state
        }
    }

export default controlsReducer;