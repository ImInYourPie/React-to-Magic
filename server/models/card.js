const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Tags
const cardSchema = new Schema({
    mana: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "",
        required: true
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Magic_the_gathering-card_back.jpg/220px-Magic_the_gathering-card_back.jpg"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;