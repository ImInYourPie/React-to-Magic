const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

// Schema variable
const Schema = mongoose.Schema;

// Users
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    realName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "default",
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.plugin(mongooseUniqueValidator);

// Create model
const User = mongoose.model('User', userSchema);

// Export model
module.exports = User;