export const fetchJournal = infoPacket => {
    return async function (dispatch) {
        dispatch({ type: 'LOAD_JOURNAL' })
        const resp = await fetch(`/users/${infoPacket.userId}/journal`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        return await dispatch({ type: 'ADD_JOURNAL', journal: json })
    }
}


export const submitEntry = (entryPacket, fetchMethod) => {
    const url = !!entryPacket.journal_entry.id ? `/journal_entries/${entryPacket.journal_entry.id}` : '/journal_entries'
    return async function (dispatch) {
        const resp = await fetch(url, {
            method: fetchMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryPacket)
        })
        const json = await resp.json()
        await dispatch({ type: 'ADD_JOURNAL', journal: json })
    }
}