const User = require("../models/user");
const Deck = require("../models/deck");
const Card = require("../models/card");

class AdminController {

    static async returnUsers(req, res) {
        if (req.user.userType !== "admin") {
            return res.status(403).send({ error: "Não tem permisões para ver este recurso" });
        } else {
            try {
                const users = User.find().lean();
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
                const deck = Deck.find().lean();
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
                const cards = Card.find().lean();
                res.status(200).send(cards);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
    

}


module.exports = AdminController;