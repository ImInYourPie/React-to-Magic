const Joi = require("@hapi/joi");
const User = require("../models/user");

module.exports = {

    async validate(req, res, next) {
        // CREATE JOI SCHEMA FOR VALIDATION
        const schema = Joi.object().keys({
            username: Joi.string().required().error(() => {
                return {
                    message: "O nome de utlizador não é válido"
                };
            }),
            realName: Joi.string().required().error(() => {
                return {
                    message: "O seu nome não é válido, não queremos descriminar desculpe lá"
                };
            }),
            password: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{6,32}$")
            ).required()
                .error(() => {
                    return {
                        message: "A password tem de ser entre 6 e 32 caracteres e conter apenas minusculas, maiusculas e numeros"
                    };
                }),
            passwordConfirm: Joi.string().valid(Joi.ref("password")).required().error(() => {
                return {
                    message: "As passwords não coincidem"
                };
            })
        })

        const { error, value } = Joi.validate(req.body, schema, { abortEarly: false }, { presence: "required" });
        let usernameExistsError = false;

        // FIND USERNAME EXISTS IN DB
        const usernameExists = await User.findOne({ username: req.body.username });

        if (error || usernameExists) {
            if (usernameExists) {
                usernameExistsError = "O nome de utilizador já se encontra registado"
            }
            res.status(400).send({ error: error.details[0].message, usernameExistsError })
        } else {
            next(); // PASS TO NEXT MIDDLEWARE
        }
    }

}