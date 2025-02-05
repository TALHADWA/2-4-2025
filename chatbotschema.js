import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
    id: {
        type: String, // Consider ObjectId if needed: mongoose.Schema.Types.ObjectId
        required: true,
        unique: true
    },
    messageType: { 
        type: String,
        required: true,
        enum: ["text", "image"] // Restricts values to only "text" or "image"
    },
    message: {
        type: String,
        trim: true, // Removes leading/trailing spaces
        required: function () {
            return this.messageType === "text"; // Use function, not arrow function
        }
    },
    imageUrl: {
        type: String,
        trim: true,
        required: function () {
            return this.messageType === "image"; // Use function, not arrow function
        }
    }
});

// Export the model using `export default`
const Chatbot = mongoose.model("Chatbot", chatbotSchema);
export default Chatbot;
