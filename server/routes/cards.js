const express = require("express");
const router = express.Router();
const CardsController = require("../controllers/cards.controller");
const CardsValidator = require("../validations/card.validation");
const isAuthenticated = require("../validations/isAuthenticated.validation");

router.get("/", isAuthenticated, CardsController.returnUserCards);

router.post("/post", isAuthenticated, CardsValidator.validate, CardsController.registerCard);

router.delete("/delete/:id", isAuthenticated, CardsController.deleteCard);

router.put("/update/:id", isAuthenticated, CardsController.updateCard);


module.exports = router;