const Card = require("../models/card");
const Deck = require("../models/deck");

class CardsController {

    static async returnCards(req, res) {
        const cards = await Card.find({}).lean();
        if (!cards.length) return res.status(404).send({ error: "Não foram encontradas cartas na base de dados" });
        else return res.status(200).send(cards);
    }

    static async returnUserCards(req, res) {
        const userId = req.user._id;
        const cards = await Card.find({ user: userId });
        if (!cards.length) return res.status(404).send({ error: "Não foram encontradas cartas associadas a este utilizador" });
        else return res.status(200).send(cards);
    }

    static async registerCard(req, res) {
        // NEW USER WITH BODY PROPERTIES
        let newCard = new Card({
            mana: req.body.mana,
            name: req.body.name,
            description: req.body.description,
            user: req.user._id // TODO: implement passport
        });

        await newCard.save();
        res.status(203).send({ success: `Carta ${req.body.name} registada` })
    }

    static async deleteCard(req, res) {
        const cardId = req.params.id;
        try {
            await Card.findOneAndDelete({ _id: cardId });
            await Deck.update({ user: req.user._id }, { $pull: { cards: cardId } });
            res.status(203).send({ success: `Carta apagada` })
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
            res.status(203).send({ success: `Carta ${req.body.name} atualizada` });
        } catch (error) {
            res.status(400).send(error)
        }
    }

}


module.exports = CardsController;