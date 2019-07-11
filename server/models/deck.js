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
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ],
  registerDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
