export const fetchLists = () => {
    return async function (dispatch) {
        dispatch({ type: 'LOAD_LISTS' })
        const resp = await fetch('./lists', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dispatch)
        })
        const json = await resp.json()
        await dispatch({ type: 'ADD_LISTS', lists: json })
    }
}

export const createOrUpdateList = (listPacket, fetchMethod) => {
    const url = !!listPacket.list.id  ? `./lists/${listPacket.list.id}` : './lists'
    return async function (dispatch) {
        const resp = await fetch(url, {
            method: fetchMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listPacket)
        })
        const json = await resp.json()
        await dispatch({ type: 'ADD_LISTS', lists: json })
    }
}

export const deleteList = id => {
    return async function (dispatch) {
        const resp = await fetch(`./lists/${id}`, {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await resp.json()
        await dispatch({ type: 'ADD_LISTS', lists: json })
    }
}

export const checkboxForListItem = itemPacket => {
    return async function (dispatch) {
        await fetch(`./list_items/${itemPacket.list_item.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemPacket)
        })
    }
}
