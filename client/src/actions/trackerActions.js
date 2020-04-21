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

export const fetchTrackers = trackerPacket => {
    return async function (dispatch) {
        dispatch( {type: 'LOAD_TRACKERS' } )
        const resp = await fetch(`/monthTrackers/${trackerPacket.monthId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        await dispatch({type: 'ADD_TRACKERS', trackers: json})
    }
}

export const updateHabitDayStatus = habitDayPacket => {
    return async function (dispatch) {
        const resp = await fetch(`/tracker_days/${habitDayPacket.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitDayPacket)
        })
        const json = await resp.json()
        await dispatch({type: 'UPDATE_TRACKERS', trackers: json})
    }
}