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
                user: req.user._id,
                cards: []
            });

            for (let i = 0; i < cards.length; i++) {
                newDeck.cards.push(cards[i]._id)
            }

            await newDeck.save();
            const deck = await Deck.findById(newDeck._id).populate("cards") // Better way? 
            res.status(203).send({ success: `Baralho ${req.body.name} registado`, deck })

        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async deleteDeck(req, res) {
        const deckId = req.params.id;
        const userId = req.user._id;
        try {
            const deletedDeck = await Deck.findOneAndDelete({ _id: deckId, user: userId });
            if (deletedDeck) res.status(200).send({ success: `Baralho apagado` });
            else res.status(403).send({ error: "Não tem permisão para apagar este baralho" })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async updateDeck(req, res) {
        const deckId = req.params.id;
        const userId = req.user._id;
        const cards = req.body.cards;
        const update = {
            name: req.body.name,
            user: userId,
            cards: []
        }
        for (let i = 0; i < cards.length; i++) {
            update.cards.push(cards[i]._id)
        }

        try {
            const updatedDeck = await Deck.findOneAndUpdate({ _id: deckId, user: userId }, update).populate("cards");
            if (updatedDeck) {
                res.status(203).send({ success: `Baralho ${req.body.name} atualizado`, deck: updatedDeck });
            } else {
                res.status(403).send({ error: "Não tem permisão para atualizar este baralho" })
            }
        } catch (error) {
            res.status(400).send(error)
        }
    }

}


module.exports = DecksController;