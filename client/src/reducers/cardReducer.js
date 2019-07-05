import { GET_CARDS, ADD_CARD, FETCH_CARDS, FETCH_CARDS_ERROR } from "../actions/types";

const initialState = {
    fetching: false,
    fetched: false,
    fetchError: false,
    items: [],
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CARDS:
            return {
                ...state,
                fetching: true,
            }
        case FETCH_CARDS_ERROR:
            return {
                ...state,
                fetching: false,
                fetchError: action.payload
            }
        case GET_CARDS:
            return {
                ...state,
                fetching: false,
                fetched: true,
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