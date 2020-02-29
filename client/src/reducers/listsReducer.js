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

            // case 'CREATE_LIST':
            //     return {
            //         ...state,
            //         list: action.payload.list
            //     }

            // case 'EDIT_LIST':
            //     return {
            //         ...state,
            //         lists: action.lists
            //     }

            default:
                return state;
        }
    }


export default listsReducer;