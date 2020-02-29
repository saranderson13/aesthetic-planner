// export const fetchMonthsForWidget = () => {
//     return (dispatch) => {
//         dispatch({type: 'LOAD_MONTHS_FOR_WIDGET'})
//         fetch('/months')
//             .then( resp => resp.json() )
//             .then (json => {
//                 dispatch({type: 'ADD_MONTHS_FOR_WIDGET', months: json})
//             })
//     }
// }

export const fetchMonthsForWidget = () => {
    return async function (dispatch) {
        dispatch({type: 'LOAD_MONTHS_FOR_WIDGET'})
        const resp = await fetch('/months', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        return await dispatch({type: 'ADD_MONTHS_FOR_WIDGET', months: json})
    }
}