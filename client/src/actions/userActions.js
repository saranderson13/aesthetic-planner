export const fetchUser = () => {
    return async function (dispatch) {
        dispatch({ type: 'LOAD_DAYS' })
        const resp = await fetch('/days', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        return await dispatch({ type: 'RETURN_DAYS', days: json })
    }
}