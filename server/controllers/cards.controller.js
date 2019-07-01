const bcrypt = require("bcrypt");
const Card = require("../models/card");

class CardsController {

    static async returnCards(req, res) {
        const cards = await Card.find({}).lean();
        if (!cards.length) return res.status(404).send({ message: "Não foram encontradas cartas na base de dados" });
        else return res.status(200).send(cards);
    }

    static async returnUserCards(req, res) {
        const userId = "5d1a12c60beed542b06130e0";
        const cards = await Card.find({user: userId});
        if(!cards.length) return res.status(404).send({ message: "Não foram encontradas cartas associadas a este utilizador"});
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
        res.status(203).send({ message: `Carta ${req.body.name} registada` })
    }

    static async deleteCard(req, res) {
        const cardId = req.params.id;
        try {
            await Card.findOneAndDelete({ _id: cardId });
            res.status(203).send({ message: "Carta apagada" })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async updateCard(req, res) {
        const cardId = req.params.id;
        const update = {
            mana: req.body.mana,
            name: req.body.name,
            description: req.body.description
        }
        try {
            await Card.findByIdAndUpdate(cardId, update);
            res.status(203).send({ message: "Carta atualizada" });
        } catch (error) {
            res.status(400).send(error)
        }
    }

}


module.exports = CardsController;