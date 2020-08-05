const listsReducer = (
    state = {
        lists: [],
        loading: false
    }, action ) => {

        switch (action.type) {

            case 'LOAD_LISTS':
                return {
                    ...state,
                    lists: [...state.lists],
                    loading: true
                }

            case 'ADD_LISTS':
                return {
                    ...state,
                    lists: action.lists,
                    loading: false
                }

            case 'CLEAR_LISTS':
                return {
                    ...state,
                    lists: []
                }

            default:
                return state;
        }
    }


export default listsReducer;