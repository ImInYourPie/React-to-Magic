const express = require("express");
const router = express.Router();
const CardsController = require("../controllers/cards.controller");

router.get("/", CardsController.returnCards);

router.post("/", CardsController.registerCard);


module.exports = router;