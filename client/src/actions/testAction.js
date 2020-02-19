export const fetchTest = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING_TEST'})
        fetch('/months')
            .then( resp => resp.json() )
            .then (json => {
                // debugger;
                dispatch({type: 'ADD_TEST_DATA', months: json})
            })
    }
}

// export const fetchTest = (months) => {
//     return { type: 'ADD_TEST_DATA', months: months }
// }