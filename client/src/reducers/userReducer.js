const userReducer = (

    state = {
        user_id: null,
        email: null,
        username: null,
        name: null,
        admin: false,
        loading_user: false,
        logged_in: false
    }, action ) => {
        switch (action.type) {
            
            case 'LOADING_USER':
                return {
                    ...state,
                    loading_user: true,
                    logged_in: false
                }

            case 'LOGGING_IN':
                return {
                    ...state,
                    loading_user: true,
                    logged_in: false
                }
                
            case 'USER_CREATION':
                return {
                    ...state,
                    loading_user: true,
                    logged_in: false
                }    
                
            case 'SET_USER':
                const userInfo = JSON.parse(action.user.user_info)
                return {
                    ...state,
                    loading_user: false,
                    logged_in: action.user.logged_in,
                    user_id: userInfo.id,
                    email: userInfo.email,
                    username: userInfo.username,
                    name: userInfo.name,
                    admin: userInfo.admin
                }

            case 'SET_NO_USER':
                return {
                    ...state,
                    loading_user: false,
                    logged_in: action.user.logged_in,
                    user_id: null,
                    email: null,
                    username: null,
                    name: null,
                    admin: false
                }

            default: 
                return state
        }
    }

export default userReducer