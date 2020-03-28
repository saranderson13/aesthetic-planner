export const fetchPalettes = () => {
    return async function (dispatch) {
        dispatch( {type: 'LOAD_PALETTES'} )
        const resp = await fetch('/tracker_palettes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        await dispatch({type: 'ADD_PALETTES', palettes: json})
    }
}