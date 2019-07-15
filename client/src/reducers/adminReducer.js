import {
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
  SET_LOADING_USERS
} from "../actions/types";

const initialState = {
  items: [],
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
        items: action.payload,
        loading: false
      };
    case DELETE_USER: {
      return {
        ...state,
        items: state.items.filter(user => user._id !== action.payload),
        loading: false
      };
    }
    case UPDATE_USER:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? {
            ...item,
            username: action.payload.username,
            realName: action.payload.realName,
            userType: action.payload.userType
          } : item
        ),
        loading: false
      };
    default:
      return state;
  }
}
