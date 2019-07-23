const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");

router.post("/", AuthenticationController.login);

router.get("/test", AuthenticationController.test);

module.exports = router;
