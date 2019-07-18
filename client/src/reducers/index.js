import {combineReducers } from "redux";
import cardReducer from "./cardReducer";
import decksReducer from "./decksReducer";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
    cards: cardReducer,
    decks: decksReducer,
    user: userReducer,
    UI: uiReducer,
    admin: adminReducer
})