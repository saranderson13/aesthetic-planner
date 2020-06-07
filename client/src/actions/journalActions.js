export const fetchJournal = () => {
    return async function (dispatch) {
        dispatch({ type: 'LOAD_JOURNAL' })
        const resp = await fetch('/user/4/journal', {
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


export const submitJournal = (journalPacket, fetchMethod) => {
    const url = !!journalPacket.journal.id ? `/user/4/journal/${journalPacket.journal.id}` : '/user/4/journal'
    return async function (dispatch) {
        const resp = await fetch(url, {
            method: fetchMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journalPacket)
        })
        const json = await resp.json()
        return await dispatch({ type: 'ADD_JOURNALS', journal: json })
    }
}