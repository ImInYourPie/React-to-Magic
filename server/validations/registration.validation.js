const Joi = require("@hapi/joi");
const User = require("../models/user");

module.exports = {

    async validate(req, res, next) {
        // CREATE JOI SCHEMA FOR VALIDATION
        const schema = {
            username: Joi.string(),
            realName: Joi.string(),
            password: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{6,32}$")
            ),
            passwordConfirm: Joi.string().valid(Joi.ref("password"))
        }

        const { error, value } = Joi.validate(req.body, schema);
        let hasUsernameError = false;
        let hasRealNameError = false;
        let hasPasswordError = false;
        let hasPassConfirmError = false;
        let usernameExistsError = false;

        // FIND USERNAME EXISTS IN DB
        const usernameExists = await User.findOne({ username: req.body.username });

        // DECLARE ERRORS TO SEND IN RES
        if (error || usernameExists) {
            if (error) {
                switch (error.details[0].context.key) {
                    case "username":
                        hasUsernameError = "O nome de utilizador não é valido"
                    case "realName":
                        hasRealNameError = "O seu nome não é válido, não sei porque desculpe não quero descriminar"
                    case "password":
                        hasPasswordError = "A password tem de ser entre 6 e 32 caracteres e conter apenas minusculas, maiusculas e numeros"
                        break
                    case "passwordConfirm":
                        hasPassConfirmError = "As passwords não coincidem"
                        break
                }
            }
            if (usernameExists) {
                usernameExistsError = "O nome de utilizador já se encontra registado"
            }
            res.status(400).send({ hasUsernameError, hasRealNameError, hasPasswordError, hasPassConfirmError, usernameExistsError })
        } else {
            next(); // PASS TO NEXT MIDDLEWARE
        }
    }

}