const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Tags
const notificationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    seen : {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;