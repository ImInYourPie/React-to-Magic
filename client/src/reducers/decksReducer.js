import {
  GET_DECKS,
  ADD_DECK,
  SEARCH_DECKS,
  DELETE_DECK,
  SET_LOADING_DECKS,
  SET_DECKS_ERRORS,
  UPDATE_DECK
} from "../actions/types";

const initialState = {
  items: [],
  filteredItems: [],
  item: {},
  loading: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_DECKS:
      return {
        ...state,
        loading: true
      };
    case SET_DECKS_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case GET_DECKS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case SEARCH_DECKS:
      return {
        ...state,
        filteredItems: state.items.filter(item => item.name === action.payload)
      };
    case DELETE_DECK: {
      return {
        ...state,
        items: state.items.filter(deck => deck._id !== action.payload),
        loading: false
      };
    }
    case ADD_DECK:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false,
        errors: null
      };
    case UPDATE_DECK:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id
            ? {
                ...item,
                name: action.payload.name,
                cards: action.payload.cards
              }
            : item
        ),
        loading: false
      };
    default:
      return state;
  }
}
