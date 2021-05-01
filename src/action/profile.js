import api from './api.js'

export const ACTION_TYPES = {
    UPDATE: 'UPDATE',
    FETCH_ALL: 'FETCH_ALL'
}

export const fetchAll = () => dispatch => {
    api.profile().fetchAll()
        .then(res => {
            console.log(res)
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const update = (id,data, onSuccess) => dispatch => {
    api.profile().update(id,data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

