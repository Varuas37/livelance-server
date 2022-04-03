import dotenv from "dotenv";
import express from "express";
import CompositionRoot from "./CompositionRoot";

//const messageRoutes = require("./messages/entrypoint/messages");
//added for messaging
import allUserRoutes from "./auth/entrypoint/allUsersRoute";
import messageRoutes from "./messages/entrypoint/messages";
import { Server } from "socket.io";

var onlineUsers;

dotenv.config();
CompositionRoot.configure();

const PORT = process.env.PORT;

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", CompositionRoot.authRouter());
app.use("/jobs", CompositionRoot.jobRouter());
app.use("/profile", CompositionRoot.profileRouter());
app.use("/message", CompositionRoot.messageRouter());
app.use("/review", CompositionRoot.reviewRouter());
// added for msg
app.use("/messages", messageRoutes);
//added to fetch all users
//app.use("/auth/users", allUserRoutes);

const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

const io = new Server(server, {
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