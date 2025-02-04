const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
    id: {
        type: String, // Corrected from Int to Number
        required: true,
        unique: true // Ensures each ID is unique
    },
    messageType: { // Renamed from "typeof" to "messageType"
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Chatbot", chatbotSchema);
