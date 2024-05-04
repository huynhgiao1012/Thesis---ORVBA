module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Have a new user connected");
  });
};
