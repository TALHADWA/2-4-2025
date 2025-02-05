import mongoose from "mongoose";

const model = new mongoose.Schema({
    id: {
        type: String,
    },
    userid: {
        type: String,
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    }
});

// Use `export default` instead of `module.exports`
export default mongoose.model("Bilal", model);
