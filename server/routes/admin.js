const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/administration.controller");
const isAuthenticated = require("../validations/isAuthenticated.validation");

router.get("/users", isAuthenticated, AdminController.returnUsers);

router.get("/decks", isAuthenticated, AdminController.returnDecks);

router.get("/cards", isAuthenticated, AdminController.returnCards);

router.put("/users/update/:id", isAuthenticated, AdminController.updateUser);

router.put("/decks/update/:id", isAuthenticated, AdminController.updateDeck);

router.put("/cards/update/:id", isAuthenticated, AdminController.updateCard);

router.delete("/users/delete/:id", isAuthenticated, AdminController.deleteUser);

router.delete("/decks/delete/:id", isAuthenticated, AdminController.deleteDeck);

router.delete("/cards/delete/:id", isAuthenticated, AdminController.deleteCard);

module.exports = router;