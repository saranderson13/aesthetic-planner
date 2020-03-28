const trackersReducer = (
    state = {
        palettes: [],
        loadingPalettes: false
    }, action ) => {
        switch (action.type) {

            case 'LOAD_PALETTES':
                return {
                    ...state,
                    palettes: [...state.palettes],
                    loadingPalettes: true
                }

            case 'ADD_PALETTES': 
                return {
                    ...state,
                    palettes: action.palettes,
                    loadingPalettes: false
                }

            default:
                return state
        }
    }

export default trackersReducer