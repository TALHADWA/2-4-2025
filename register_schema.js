import mongoose from "mongoose";

const register = new mongoose.Schema({
    id: {
        type: String, // Corrected from Int to Number
        required: true,
        unique: true // Ensures each ID is unique
    },
    email: { // Renamed from "typeof" to "messageType"
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("Register",register);