export const fetchTest = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_TEST'})
        fetch('http://localhost:3001/months')
            .then( resp => resp.json() )
            .then (json => {
                dispatch({type: 'ADD_TEST_DATA', months: json})
            })
    }
}