import * as types from '../types'


const ItemReducer = (state, action) => {
    switch(action.type) {

        case types.SET_ITEMS:
            return {
                ...state,
                items : action.payload,
                item : {}
            }
        case types.SET_CURRENT_ITEM:
            return {
                ...state,
                item : action.payload,
                items : {}
            }
        case types.SET_CURRENT_DESCRIPTION:
            return {
                ...state,
                description : action.payload
            }
        case types.SET_CATEGORIES:
            return {
                ...state,
                category : action.payload
            }

        default:
            return state;
    }
}

export default ItemReducer;