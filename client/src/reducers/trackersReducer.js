const trackersReducer = (
    state = {
        palettes: [],
        loadingPalettes: false,
        trackers: [],
        loadingTrackers: false
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

            case 'LOAD_TRACKERS':
                return {
                    ...state,
                    trackers: state.trackers,
                    loadingTrackers: true
                }

            case 'ADD_TRACKERS':
                return {
                    ...state,
                    trackers: action.trackers.trackers,
                    loadingTrackers: false
                }

            case 'UPDATE_TRACKERS':
                return {
                    ...state,
                    trackers: action.trackers,
                    loadingTrackers: false
                }

            default:
                return state
        }
    }

export default trackersReducer