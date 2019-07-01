const express = require("express");
const router = express.Router();
const CardsController = require("../controllers/cards.controller");
const CardsValidator = require("../validations/card.validation");

router.get("/", CardsController.returnUserCards);

router.post("/", CardsValidator.validate, CardsController.registerCard);

router.delete("/delete/:id", CardsController.deleteCard);

router.put("/update/:id", CardsController.updateCard);


module.exports = router;