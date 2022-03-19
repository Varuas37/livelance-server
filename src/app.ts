import dotenv from 'dotenv'
import express from 'express'
import CompositionRoot from './CompositionRoot'

declare var onlineUsers: any

const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const socket = require("socket.io");


dotenv.config()
CompositionRoot.configure()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use(cors());

app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.DEV_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


// Routes
app.use('/auth', CompositionRoot.authRouter())
app.use('/jobs', CompositionRoot.jobRouter())
app.use('/profile', CompositionRoot.profileRouter())
app.use('/message', CompositionRoot.messageRouter())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});