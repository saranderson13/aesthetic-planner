export const fetchDays = () => {
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
        // console.log(resp)
        const json = await resp.json()
        // debugger;
        return await dispatch({ type: 'RETURN_DATES', days: json })
    }
}