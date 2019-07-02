const express = require("express");
const router = express.Router();
const DecksController = require("../controllers/decks.controller");
const DecksValidator = require("../validations/deck.validation");
const isAuthenticated = require("../validations/isAuthenticated.validation");

router.get("/", isAuthenticated, DecksController.returnUserDecks);

router.post("/post", isAuthenticated, DecksValidator.validate, DecksController.registerDeck);

router.delete("/delete/:id", isAuthenticated, DecksController.deleteDeck);

router.put("/update/:id", isAuthenticated, DecksController.updateDeck);


module.exports = router;