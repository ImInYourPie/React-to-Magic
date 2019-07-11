import {
  GET_CARDS,
  ADD_CARD,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from "./types";
import axios from "axios";

export const getCards = () => dispatch => {
  dispatch({ type: "SET_LOADING_CARDS" });
  axios
    .get("/cards")
    .then(res => {
      dispatch({ type: "GET_CARDS", payload: res.data });
    })
    .catch(error => {
      dispatch({ type: "SET_CARDS_ERRORS", payload: error.response.data.error });
    });
};

export const addCard = cardData => dispatch => {
  dispatch({ type: "SET_LOADING_CARDS" });
  axios
    .post("/cards/post", {
      mana: cardData.mana,
      name: cardData.name,
      description: cardData.description
    })
    .then(data => {
      dispatch({
        type: "ADD_CARD",
        payload: data.data.card
      });
    })
    .catch(error => {
      dispatch({ type: "SET_CARDS_ERRORS", payload: error.response.data.error });
    });
};

export const deleteCard = cardId => dispatch => {
  axios
    .delete(`/cards/delete/${cardId}`)
    .then(() => {
      dispatch({
        type: "DELETE_CARD",
        payload: cardId
      });
      dispatch({ type: "CLEAR_ERRORS" });
    })
    .catch(error => {
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
    });
};
