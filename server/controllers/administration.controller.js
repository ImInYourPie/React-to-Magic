const User = require("../models/user");
const Deck = require("../models/deck");
const Card = require("../models/card");
const Notification = require("../models/notification");

class AdminController {

    static async returnUsers(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
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
            return res.status(403).send({ error: "You don't have permision to view this resource" });
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
            return res.status(403).send({ error: "You don't have permision to view this resource" });
        } else {
            try {
                const cards = await Card.find({}).lean();
                res.status(200).send(cards);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async deleteCard(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
        } else {
            try {
                const cardId = req.params.id;
                const currentCard = await Card.findById(cardId);
                await Card.findByIdAndDelete(cardId);
                await Deck.findOneAndUpdate({ user: currentCard.user }, { $pull: { cards: cardId } }, { safe: true });
                let newNotification = new Notification({
                    description: `Your card, ${currentCard.name}, was deleted by an admin`,
                    user: currentCard.user
                });
                newNotification.save();
                res.status(200).send({ success: `Card deleted with success` })
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async deleteDeck(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
        } else {
            try {
                const deckId = req.params.id;
                const currentDeck = await Deck.findById(deckId);
                await Deck.findByIdAndDelete(deckId);
                let newNotification = new Notification({
                    description: `Your deck, ${currentDeck.name}, was deleted by an admin`,
                    user: currentCard.user
                });
                newNotification.save();
                res.status(200).send({ success: `Deck deleted with success` })
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }

    static async updateCard(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
        } else {
            try {
                const cardId = req.params.id;
                const currentCard = await Card.find({ user: req.body.user }).lean();
                const update = {
                    mana: req.body.mana,
                    name: req.body.name,
                    description: req.body.description
                }
                await Card.findByIdAndUpdate(cardId, update);
                let newNotification = new Notification({
                    description: `Your card, ${currentCard.name}, was updated by an admin`,
                    user: currentCard.user
                });
                newNotification.save();
                res.status(203).send({ success: `Card ${req.body.name} updated` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    static async updateDeck(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
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
                    update.cards.push(cards[i]._id)
                }
                await Deck.findByIdAndUpdate(deckId, update);
                let newNotification = new Notification({
                    description: `Your deck, ${currentDeck.name}, was updated by an admin`,
                    user: currentDeck.user
                });
                newNotification.save();
                res.status(203).send({ success: `Deck ${req.body.name} updated` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    static async updateUser(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
        } else {
            try {
                const userId = req.params.id;
                const update = {
                    username: req.body.username,
                    realName: req.body.realName,
                    userType: req.body.userType
                }
                const updatedUser = await User.findByIdAndUpdate(userId, update);
                let newNotification = new Notification({
                    description: `One or more of your credentials were updated by an admin. Username: ${updatedUser.username}, Name: ${updatedUser.realName}, Privileges: ${updatedUser.userType}`,
                    user: req.params.id
                });
                newNotification.save();
                res.status(203).send({ success: `User ${req.body.name} updated` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

    static async deleteUser(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "You don't have permision to view this resource" });
        } else {
            try {
                const userId = req.params.id;
                await User.findByIdAndDelete(userId);
                await Card.find({ user: userId }).remove();
                await Deck.find({ user: userId }).remove();
                res.status(203).send({ success: `The user, his cards, and his decks were deleted with success` });
            } catch (error) {
                res.status(400).send(error)
            }
        }
    }

}


module.exports = AdminController;