const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");
const RegistrationValidator = require("../validations/registration.validation");

// test
router.get("/", AuthenticationController.test);

router.post("/", RegistrationValidator.validate, AuthenticationController.register);


module.exports = router;