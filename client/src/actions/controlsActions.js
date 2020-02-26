export const fetchMonthsForWidget = () => {
    return (dispatch) => {
        dispatch({type: 'LOAD_MONTHS_FOR_WIDGET'})
        fetch('/months')
            .then( resp => resp.json() )
            .then (json => {
                dispatch({type: 'ADD_MONTHS_FOR_WIDGET', months: json})
            })
    }
}