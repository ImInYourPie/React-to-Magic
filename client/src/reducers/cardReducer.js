import { GET_CARDS, ADD_CARD } from "../actions/types";

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CARDS:
            return {
                ...state,
                items: action.payload
            }
        case ADD_CARD:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}