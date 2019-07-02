const Deck = require("../models/deck");
const Card = require("../models/card");

class DecksController {

    static async returnsDecks(req, res) {
        const decks = await Deck.find({}).populate("cards").lean();
        if (!decks.length) return res.status(404).send({ error: "Não foram encontradas cartas na base de dados" });
        else return res.status(200).send(decks);
    }

    static async returnUserDecks(req, res) {
        const userId = req.user._id;
        const decks = await Deck.find({ user: userId }).populate("cards").lean();
        if (!decks.length) return res.status(404).send({ error: "Não foram encontrados varalhos para este utilizador" });
        else return res.status(200).send(decks);
    }

    static async registerDeck(req, res) {
        try {
            const cards = req.body.cards;
            // NEW USER WITH BODY PROPERTIES
            let newDeck = new Deck({
                name: req.body.name,
                user: req.user._id, // TODO: implement passport
                cards: []
            });
            
            for (let i = 0; i < cards.length; i++) {
                newDeck.cards.push(cards[i]._id)
            }
            
            await newDeck.save();
            res.status(203).send({ success: `Varalho ${req.body.name} registada` })

        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async deleteDeck(req, res) {
        const deckId = req.params.id;
        try {
            await Deck.findOneAndDelete({ _id: deckId });
            res.status(200).send({ success: `Carta apagada` })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async updateDeck(req, res) {
        const deckId = req.params.id;
        const update = {
            name: req.body.name,
            user: req.user._id,
            cards: []
        }
        for (let i = 0; i < cards.length; i++) {
            newDeck.cards.push(cards[i]._id)
        }

        try {
            await Deck.findByIdAndUpdate(deckId, update);
            res.status(203).send({ success: `Varalho ${req.body.name} atualizado` });
        } catch (error) {
            res.status(400).send(error)
        }
    }

}


module.exports = DecksController;