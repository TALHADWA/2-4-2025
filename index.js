import express from "express";
import mongoose from "mongoose";
import schema from "./schma.js"; // Ensure the filename is correct
import bodyParser from "body-parser";
import Pusher from "pusher";
import uid from "uid2";
import chatbot from "./chatbotschema.js";
import multer from "multer";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' })
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"; // <-- Import ref here


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzNrLRffHqW4oyoVxk7d9oElel_SQwseM",
    authDomain: "wanna-play-app-cb189.firebaseapp.com",
    databaseURL: "https://wanna-play-app-cb189-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wanna-play-app-cb189",
    storageBucket: "wanna-play-app-cb189.appspot.com",
    messagingSenderId: "22091205567",
    appId: "1:22091205567:web:2b76bfde562c8dbb612f0a",
    measurementId: "G-CSZMDTSDN4"
  };

const apps = initializeApp(firebaseConfig);
const storage = getStorage(apps);
console.log("jk");
app.get("/getbyid/:id", async function (req, res) {
    try {
        try {
            const data = await schema.find({id: req.params.id});
            res.send(data);
        } catch (err) {
            res.status(500).send({ error: "Error fetching data" });
        }
    } catch (err) {
        console.error("Error Saving Data:", err); // Log error message
        res.status(500).send({ error: "Error saving data", details: err.message });
    }
});
app.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })
// Define routes
app.get("/getdata", async function (req, res) {
    try {
        const data = await schema.find();
        pusher.trigger("my-channel", "my-event", {
            message: "hello world"
          });
          
        res.send(data);
    } catch (err) {
        res.status(500).send({ error: "Error fetching data" });
    }
});



app.post("/deletebyid/:id", async function (req, res) {
    try {
        const data = await schema.deleteOne({id:req.params.id});
        res.send(data);
    } catch (err) {
        res.status(500).send({ error: "Error fetching data" });
    }
});



app.post("/postdata", async function (req, res) {
    try {
        console.log("Incoming Data:", req.body); // Log incoming request data

        const bn = new schema({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            body: req.body.body,
        });

        const data = await bn.save();
        console.log("Data Saved Successfully:", data); // Log saved data

        res.status(201).send(data);
    } catch (err) {
        console.error("Error Saving Data:", err); // Log error message
        res.status(500).send({ error: "Error saving data", details: err.message });
    }
});




const pusher = new Pusher({
  appId: "1936130",
  key: "fdc993add4d3aab4aa72",
  secret: "53fd1a6c5c0fb1a0e5c8",
  cluster: "eu",
  useTLS: true
});


















///////////////////////////////////////////////////////chabotmobile
app.post("/send_chatbot_message",upload.single("image"), async function (req,res) {
    
    try {
        // Prepare chatbot message
        let messageData = {
            id: uid(2),
            messageType: req.body.messageType,
            message: req.body.message,
            
        };

        // If image is provided, upload it to Firebase Storage
        if (req.file) {
            const filePath = `images/${req.file.filename}`;  // Store with a unique name
            const fileRef = ref(storage, filePath);
            const fileBuffer = req.file.buffer;
            const metadata = { contentType: req.file.mimetype };

            // Upload the image to Firebase Storage
            const snapshot = await uploadBytesResumable(fileRef, fileBuffer, metadata);

            // Get the image URL after upload
            const imageUrl = await getDownloadURL(snapshot.ref);

            // Add the image URL to message data
            messageData.imageUrl = imageUrl;
        }

        // Create new chatbot message instance
        const message = new chatbot(messageData);

        // Save message to DB
        const savedMessage = await message.save();

        // Trigger Pusher event (chatbot channel)
        pusher.trigger("chatbotchannel", "chatbot", {
            message: savedMessage.message,
            messgaeType:savedMessage.messageType
            
          //  imageUrl: savedMessage.imageUrl || null // Send imageUrl if available
        });

        // Send response based on whether the message was saved
        if (savedMessage) {
            res.send({
                message: "Message sent successfully",
                data: savedMessage
            });
        } else {
            res.status(500).send({ error: "Error saving message" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: "Error occurred while sending message" });
    }
   
} )


app.get("/get_chatbot_message",async function (req,res) {
    
    try {
       const message=await chatbot.find();
       res.send(message);
    } catch (error) {
        res.send(error);
    }
   
} )





 

// Connect to MongoDB and Start the Server
mongoose
    .connect("mongodb+srv://talhaali21cv:tyCnq4g7drn1PZzH@cluster0.jsmg5yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });
