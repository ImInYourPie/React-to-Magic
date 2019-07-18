import {
  GET_USERS,
  GET_ADMIN_CARDS,
  GET_ADMIN_DECKS,
  UPDATE_USER,
  DELETE_USER,
  ADMIN_DELETE_CARD,
  ADMIN_DELETE_DECK,
  SET_LOADING_USERS,
  ADMIN_UPDATE_CARD,
  ADMIN_UPDATE_DECK
} from "../actions/types";

const initialState = {
  users: [],
  cards: [],
  decks: [],
  loading: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_USERS: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_ADMIN_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false
      };
    case GET_ADMIN_DECKS:
      return {
        ...state,
        decks: action.payload,
        loading: false
      };
    case DELETE_USER: {
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        loading: false
      };
    }
    case ADMIN_DELETE_CARD: {
      console.log(action.payload);
      return {
        ...state,
        cards: state.cards.filter(card => card._id !== action.payload),
        loading: false
      };
    }
    case ADMIN_DELETE_DECK: {
      return {
        ...state,
        decks: state.decks.filter(deck => deck._id !== action.payload),
        loading: false
      };
    }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(item =>
          item._id === action.payload._id
            ? {
                ...item,
                username: action.payload.username,
                realName: action.payload.realName,
                userType: action.payload.userType
              }
            : item
        ),
        loading: false
      };
    case ADMIN_UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map(item =>
          item._id === action.payload._id
            ? {
                ...item,
                mana: action.payload.mana,
                name: action.payload.name,
                description: action.payload.description
              }
            : item
        ),
        loading: false
      };
    case ADMIN_UPDATE_DECK:
      return {
        ...state,
        decks: state.decks.map(item =>
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
