import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import chatroomRoutes from "./routes/chatroom.js";
import messageRoutes from "./routes/message.js";
import topicRoutes from "./routes/topic.js";

import interestRoutes from "./routes/interest.js";


import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";

import http from "http";
import {Server} from "socket.io"
import Message from "./models/message.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*"
  }});




app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/user", userRoutes);
app.use("/chatroom", chatroomRoutes);
app.use("/message", messageRoutes);
app.use("/topic", topicRoutes);

app.use("/interest", interestRoutes);

app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);



io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('new-message', async (data) => {
    try {
      console.log(data)
      const { content, sender, chatroom } = data;

      const newMessage = new Message({
        content,
        sender,
        chatroom,
      });

      await newMessage.save();
      await newMessage.populate(['sender'])
      console.log(newMessage)
      io.to(chatroom).emit('new-message', newMessage);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



app.get("/", (req, res) => {
  res.send("This is an API");
});


// const username = mulchandanilakshman;
// const password = Ph3T5DjYHQeQgF8g;

const DATABASE_URL =
  "mongodb+srv://mulchandanilakshman:Ph3T5DjYHQeQgF8g@cluster0.xdkndi7.mongodb.net/doubtsmasher?retryWrites=true&w=majority";

const PORT = 5000;

mongoose
  .connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
