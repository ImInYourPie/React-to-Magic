const Joi = require("@hapi/joi");

module.exports = {
  async validate(req, res, next) {
    // CREATE JOI SCHEMA FOR VALIDATION
    const schema = Joi.object().keys({
      name: Joi.string().error(() => {
        return {
          message: "O nome do varalho não é válido"
        };
      }),
      cards: Joi.required()
    });

    const { error, value } = Joi.validate(req.body, schema);

    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      next(); // PASS TO NEXT MIDDLEWARE
    }
  }
};
