// url variables
const url = {
  registration: "/register",
  login: "/login",
  cards: "/cards",
  decks: "/decks",
  admin: "/admin"
};

// testing variables
const register = {
  username: "Killa",
  realName: "Killa El Killa",
  password: "123456",
  passwordConfirm: "123456"
};

// testing variables
const secondUser = {
  username: "Killa2",
  realName: "Killa El Killa",
  password: "123456",
  passwordConfirm: "123456"
};

let credentials = {
  token: null,
  user: {}
};

let secondCredentials = {
  token: null,
  user: {}
};

const card = {
  mana: 3,
  name: "Test card",
  description: "A test card"
};

var savedCards = [];

let deck = {
  name: "Test deck",
  cards: []
};

var savedDecks = [];

module.exports = {
  url,
  credentials,
  register,
  card,
  savedCards,
  deck,
  savedDecks,
  secondUser,
  secondCredentials
};
