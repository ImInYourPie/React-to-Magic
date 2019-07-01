const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Tags
const deckSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Deck"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Card"
    }]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;