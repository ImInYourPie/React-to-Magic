import axios from "axios";

export const getCards = () => dispatch => {
  dispatch({ type: "SET_LOADING_CARDS" });
  axios
    .get("/cards")
    .then(res => {
      dispatch({ type: "GET_CARDS", payload: res.data });
    })
    .catch(error => {
      dispatch({
        type: "SET_CARDS_ERRORS",
        payload: error.response.data.error
      });
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
      dispatch({
        type: "SET_CARDS_ERRORS",
        payload: error.response.data.error
      });
    });
};

export const deleteCard = cardId => dispatch => {
  axios
    .delete(`/cards/delete/${cardId}`)
    .then(() => {
      console.log(cardId);
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

export const updateCard = cardData => dispatch => {
  dispatch({ type: "SET_LOADING_CARDS" });
  axios
    .put(`/cards/update/${cardData._id}`, {
      mana: cardData.mana,
      name: cardData.name,
      description: cardData.description
    })
    .then(() => {
      dispatch({
        type: "UPDATE_CARD",
        payload: cardData
      });
      dispatch({ type: "CLEAR_ERRORS" });
    })
    .catch(error => {
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
    });
};

// export const filterCards = filterText => dispatch => {
//   dispatch({ type: "FILTER_CARDS", payload: filterText });
// };
