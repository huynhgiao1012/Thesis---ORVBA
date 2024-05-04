require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Mongo = require("./config/db");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const EmailService = require("./utils/EmailService");
const catchError = require("./middleware/error");
const authRoutes = require("./route/authRoutes");
const garageRoutes = require("./route/garageRoutes");
const serviceRoutes = require("./route/serviceRoutes");
const userRoutes = require("./route/userRoutes");
const notiRoutes = require("./route/notiRoutes");
const formRoutes = require("./route/formRoutes");
const managerRoutes = require("./route/managerRoutes");
const feedbackRoutes = require("./route/feedbackRoutes");
const mechanicRoutes = require("./route/mechanicRoutes");
const accountantRoutes = require("./route/accountantRoutes");
const customerRoutes = require("./route/customerRoutes");
app.use(express.json({ limit: "5000kb" }));
app.use(cors());
EmailService.init();
Mongo.connect();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/garage", garageRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notification", notiRoutes);
app.use("/api/v1/form", formRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/manager", managerRoutes);
app.use("/api/v1/mechanic", mechanicRoutes);
app.use("/api/v1/accountant", accountantRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use(catchError);
const port = process.env.PORT || 3000;

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.find((user) => user.userId === userId) &&
    onlineUsers.push({ userId: userId, socketId: socketId });
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId: userId, socketId: socket.id });
  });
  console.log("connected");
  // socket.on("sendNotification", ({ senderName, receiverName, text }) => {
  //   const intervalId = setInterval(() => {
  //     const receiver = getUser(receiverName);
  //     if (receiver) {
  //       io.to(receiver.socketId).emit("getNotification", {
  //         senderName,
  //         receiverName,
  //         text,
  //       });
  //       setInterval(() => {
  //         !onlineUsers.some((user) => user.userId === receiver.userId) &&
  //           onlineUsers.push({
  //             userId: receiver.userId,
  //             socketId: receiver.socketId,
  //           });
  //       }, 1000);
  //       clearInterval(intervalId);
  //     }
  //   }, 1000);
  // });
  socket.on("sendNotification", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        receiverName,
        text,
      });
    }
  });
  socket.on(
    "sendNotificationPickForm",
    ({ senderName, receiverName, text }) => {
      // const receiver = getUser(receiverName);
      // if (!receiver) {
      const intervalId = setInterval(() => {
        const receiver = getUser(receiverName);
        if (receiver) {
          io.to(receiver.socketId).emit("getNotification", {
            senderName,
            receiverName,
            text,
          });
          setInterval(() => {
            !onlineUsers.some((user) => user.userId === receiver.userId) &&
              onlineUsers.push({
                userId: receiver.userId,
                socketId: receiver.socketId,
              });
          }, 1000);
          clearInterval(intervalId);
        }
      }, 1000);
    }
  );
  socket.on("sendEmergencyForm", ({ data }) => {
    io.emit("getEmergencyForm", {
      data: data,
    });
  });
  socket.on("sendMaintenanceForm", ({ data, garageId }) => {
    io.emit("getMaintenanceForm", {
      data: { data: data, id: garageId },
    });
  });
  socket.on("disconnectUser", () => {
    removeUser(socket.id);
  });
});
server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
