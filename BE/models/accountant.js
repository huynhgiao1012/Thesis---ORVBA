const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { GROUP } = require("../constant");

const AccountantSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    garageId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Garage",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Accountant",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Accountant", AccountantSchema);
