import axios from "axios";

export const getDecks = () => dispatch => {
  dispatch({ type: "SET_LOADING_DECKS" });
  axios
    .get("/decks")
    .then(res => {
      dispatch({ type: "GET_DECKS", payload: res.data });
    })
    .catch(error => {
      dispatch({
        type: "SET_DECKS_ERRORS",
        payload: error.response.data.error
      });
    });
};

export const addDeck = deckData => dispatch => {
  dispatch({ type: "SET_LOADING_DECKS" });
  axios
    .post("/decks/post", { name: deckData.name, cards: deckData.cards })
    .then(res => {
      dispatch({
        type: "ADD_DECK",
        payload: res.data.deck
      });
    })
    .catch(error => console.log(error.response));
};

export const searchDecks = name => dispatch => {
  dispatch({ type: "SEARCH_DECK", payload: name });
};

export const deleteDeck = deckId => dispatch => {
  // dispatch({type: "SET_LOADING_DECKS"})
  axios
    .delete(`/decks/delete/${deckId}`)
    .then(() => {
      dispatch({
        type: "DELETE_DECK",
        payload: deckId
      });
      dispatch({ type: "CLEAR_ERRORS" });
    })
    .catch(error => console.log(error.response));
};

export const updateDeck = deckData => dispatch => {
  // dispatch({type: "SET_LOADING_DECKS"})
  axios
    .put(`/decks/update/${deckData._id}`, {
      name: deckData.name,
      cards: deckData.cards
    })
    .then(() => {
      dispatch({
        type: "UPDATE_DECK",
        payload: deckData
      });
      dispatch({ type: "CLEAR_ERRORS" });
    })
    .catch(error => console.log(error.response));
};
