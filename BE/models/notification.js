const mongoose = require("mongoose");
const { NOTI_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    text: {
      type: String,
      required: "true",
    },
    status: {
      type: String,
      enum: NOTI_STATUS,
      default: NOTI_STATUS.UNREAD,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Notification",
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
