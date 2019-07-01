const bcrypt = require("bcrypt");
const Card = require("../models/card");

class CardsController {

    static async returnCards(req, res) {
        const cards = await Card.find({}).lean();
        if (!cards.length) return res.status(404).send({ error: "Não foram encontradas cartas associadas a este utilizador" });
        else return res.status(200).send(cards);
    }

    static async registerCard(req, res) {
        // NEW USER WITH BODY PROPERTIES
        let newCard = new Card({
            mana: req.body.mana,
            name: req.body.name,
            description: req.body.description,
            user: "5d1a12c60beed542b06130e0" // TODO: implement passport
        });

        await newCard.save();
        res.status(203).send({success: `Carta ${req.body.name} registada`})
    }

}


module.exports = CardsController;