import axios from "axios";

export const getUsers = () => dispatch => {
  axios.get("/admin/users").then(res => {
    console.log(res.data);
    dispatch({ type: "GET_USERS", payload: res.data });
  });
};

export const getCards = () => dispatch => {
  axios.get("/admin/cards").then(res => {
    console.log(res.data);
    dispatch({ type: "GET_ADMIN_CARDS", payload: res.data });
  });
};

export const getDecks = () => dispatch => {
  axios.get("/admin/decks").then(res => {
    console.log(res.data);
    dispatch({ type: "GET_ADMIN_DECKS", payload: res.data });
  });
};

export const deleteUser = userId => dispatch => {
  axios
    .delete(`/admin/users/delete/${userId}`)
    .then(() => {
      dispatch({ type: "DELETE_USER", payload: userId });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const deleteCard = cardId => dispatch => {
  axios
    .delete(`/admin/cards/delete/${cardId}`)
    .then(() => {
      dispatch({ type: "ADMIN_DELETE_CARD", payload: cardId });
      dispatch({ type: "DELETE_CARD", payload: cardId });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const deleteDeck = deckId => dispatch => {
  axios
    .delete(`/admin/decks/delete/${deckId}`)
    .then(() => {
      dispatch({ type: "ADMIN_DELETE_DECK", payload: deckId });
      dispatch({ type: "DELETE_DECK", payload: deckId });
      dispatch({ type: "CLEAR_ERRORS" });
    })
    .catch(error => {
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
    });
};

export const updateUser = userData => dispatch => {
  console.log(userData);
  axios
    .put(`/admin/users/update/${userData._id}`, {
      username: userData.username,
      realName: userData.realName,
      userType: userData.userType
    })
    .then(res => {
      dispatch({ type: "UPDATE_USER", payload: userData });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const updateCard = cardData => dispatch => {
  console.log(cardData);
  axios
    .put(`/admin/cards/update/${cardData._id}`, {
      mana: cardData.mana,
      name: cardData.name,
      description: cardData.description
    })
    .then(res => {
      dispatch({ type: "ADMIN_UPDATE_CARD", payload: cardData });
      dispatch({ type: "UPDATE_CARD", payload: cardData });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const updateDeck = deckData => dispatch => {
  console.log(deckData);
  axios
    .put(`/admin/decks/update/${deckData._id}`, {
      name: deckData.name,
      cards: deckData.cards
    })
    .then(res => {
      dispatch({ type: "ADMIN_UPDATE_DECK", payload: deckData });
      dispatch({ type: "UPDATE_DECK", payload: deckData });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};
