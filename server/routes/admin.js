const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/administration.controller");
const isAuthenticated = require("../validations/isAuthenticated.validation");

router.get("/users", isAuthenticated, AdminController.returnUsers);

router.get("/decks", isAuthenticated, AdminController.returnDecks);

router.get("/cards", isAuthenticated, AdminController.returnCards);

module.exports = router;