import {
  GET_CARDS,
  ADD_CARD,
  DELETE_CARD,
  SET_LOADING_CARDS,
  SET_CARDS_ERRORS
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  delete: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ADD_CARD:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case SET_CARDS_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    case DELETE_CARD: {
      return {
        ...state,
        items: state.items.filter(card => card._id !== action.payload),
        loading: false
      };
    }
    case SET_LOADING_CARDS: {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
}
