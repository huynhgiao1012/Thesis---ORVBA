const mongoose = require("mongoose");
class Mongo {
  gridFs = null;
  static connect = () => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connect to database successfully !");
      })
      .catch((err) => {
        console.log("Can not connect to database !");
      });
    const conn = mongoose.connection;
    conn.once("open", () => {
      // connect gridFs
      this.gridFs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.BUCKET_NAME,
      });
    });
  };
}
module.exports = Mongo;
