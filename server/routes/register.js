const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");
const RegistrationbValidation = require("../validations/registration.validation");

// test
router.get("/", AuthenticationController.test);

router.post("/", RegistrationbValidation.validate, AuthenticationController.register);


module.exports = router;