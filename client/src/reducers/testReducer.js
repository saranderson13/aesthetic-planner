const testReducer = (
    state = {
        months: [],
        loading: false
    }, action ) => {
        
        switch (action.type) {
            case 'LOADING_TEST':
                return {
                    ...state,
                    months: [...state.months],
                    loading: true
                }

            case 'ADD_TEST_DATA':
                // debugger;
                return {
                    ...state,
                    months: action.months,
                    loading: false
                }

            default:
                return state
        }
    }

export default testReducer;