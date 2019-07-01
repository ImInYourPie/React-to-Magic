const Joi = require("@hapi/joi");

module.exports = {
    async validate(req, res, next) {
        // CREATE JOI SCHEMA FOR VALIDATION
        const schema = Joi.object().keys({
            mana: Joi.number().error(() => {
                return {
                    message: "A mana inserida tem de ser um número"
                };
            }),
            name: Joi.string().error(() => {
                return {
                    message: "O nome da carta não é válido"
                };
            }),
            description: Joi.string().error(() => {
                return {
                    message: "A descrição não é válida"
                };
            })
        })

        const { error, value } = Joi.validate(req.body, schema);

        if (error) {
            res.status(400).send({ error: error.details[0].message });
        } else {
            next(); // PASS TO NEXT MIDDLEWARE
        }
    }
}