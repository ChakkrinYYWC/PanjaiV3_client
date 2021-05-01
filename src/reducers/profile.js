import { ACTION_TYPES } from '../action/profile'
const initialState = {
    list: []
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x._id === action.payload._id ? action.payload : x)
            }

        default:
            return state;
    }
}