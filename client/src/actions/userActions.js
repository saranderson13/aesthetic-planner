export const fetchUser = userPacket => {
    return async function (dispatch) {
        dispatch({ type: 'LOADING_USER' })
        const resp = await fetch(`/logged_in`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        if (json.logged_in) {
            await dispatch({ type: 'SET_USER', user: json })
        } else {
            await dispatch({ type: 'SET_NO_USER', user: json })
        }
    }
}

export const createUser = signupPacket => {
    return async function (dispatch) {
        dispatch({ type: 'USER_CREATION' })
        const resp = await fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupPacket)
        })
        const json = await resp.json()
        await dispatch({ type: 'SET_USER', user: json })
    }
}

export const loginUser = loginPacket => {
    return async function (dispatch) {
        dispatch({ type: 'LOGGING_IN' })
        const resp = await fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginPacket)
        })
        const json = await resp.json()
        await dispatch({ type: 'SET_USER', user: json})
    }
}


export const logoutUser = () => {
    return async function (dispatch) {
        const resp = await fetch('/logout', {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await resp.json()
        await dispatch({ type: 'SET_NO_USER' })
        await dispatch({ type: 'CLEAR_TRACKERS' })
        await dispatch({ type: 'CLEAR_JOURNAL' })
        await dispatch({ type: 'CLEAR_LISTS' })
    }
}