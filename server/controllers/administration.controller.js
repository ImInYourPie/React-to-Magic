const User = require("../models/user");
const Deck = require("../models/deck");
const Card = require("../models/card");

class AdminController {

    static async returnUsers(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const users = await User.find().select("-password").lean();
                res.status(200).send(users);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async returnDecks(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const deck = await Deck.find().lean();
                res.status(200).send(deck);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async returnCards(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const cards = await Card.find({}).lean();
                console.log(cards)
                res.status(200).send(cards);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async deleteCard(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const cardId = req.params.id;
                await Card.findByIdAndDelete(cardId);
                res.status(200).send({ success: `Carta apagada com sucesso` })
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async deleteDeck(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const deckId = req.params.id;
                await Deck.findByIdAndDelete(deckId);
                res.status(200).send({ success: `Varalho apagado com sucesso` })
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async updateCard(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const cardId = req.params.id;
                const update = {
                    mana: req.body.mana,
                    name: req.body.name,
                    description: req.body.description
                }
                await Card.findByIdAndUpdate(cardId, update);
                res.status(203).send({ success: `Carta ${req.body.name} atualizada` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    static async updateDeck(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const deckId = req.params.id;
                const currentDeck = await Deck.find({ user: req.body.user }).lean();
                const cards = req.body.cards;

                const update = {
                    name: req.body.name,
                    user: currentDeck.user,
                    cards: []
                }
                for (let i = 0; i < cards.length; i++) {
                    newDeck.cards.push(cards[i]._id)
                }
                await Deck.findByIdAndUpdate(deckId, update);
                res.status(203).send({ success: `Varalho ${req.body.name} atualizado` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    static async updateUser(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const userId = req.params.id;
                const update = {
                    username: req.body.username,
                    realName: req.body.realName
                }
                await User.findByIdAndUpdate(userId, update);
                res.status(203).send({ success: `Utilizador ${req.body.name} atualizado` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    static async deleteUser(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const userId = req.params.id;
                await User.findByIdAndDelete(userId);
                await Card.find({user: userId}).remove();
                await Deck.find({user: userId}).remove();
                res.status(203).send({ success: `O utilizador, as suas cartas, e os seus varalhos foram apagados com sucesso` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

}


module.exports = AdminController;