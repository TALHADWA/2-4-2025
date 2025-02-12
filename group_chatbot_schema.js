import mongoose from "mongoose";
import chat from "./chatbotschema.js";
const groupchatbotSchema = new mongoose.Schema({
   groupname:{
    type:String,
   },
   groupmembers:{
    type:[String],
    
   },
   chats:{
      type:[String],
      default:[],
     
   }


});

// Export the model using `export default`
const Chatbot = mongoose.model("membersallgroup", groupchatbotSchema);
export default Chatbot;
