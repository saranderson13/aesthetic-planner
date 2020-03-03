export const fetchJournals = () => {
    return async function (dispatch) {
        dispatch({ type: 'LOAD_JOURNALS' })
        const resp = await fetch('/journals', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        return await dispatch({ type: 'ADD_JOURNALS', journals: json })
    }
}