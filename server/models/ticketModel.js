const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    title: {
        type: String,
        requred: true
    },
    summary: {
        type: String,
        required: true
    },
    urgency: {
        type: Number,
        required: true
    },
    impacted: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {collection: "tickets", timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);