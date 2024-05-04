const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { GROUP } = require("../constant");

const MechanicSchema = new Schema(
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
    mePoint: {
      type: Number,
      required: true,
      default: 0,
    },
    group: {
      type: String,
      enum: GROUP,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Mechanic",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Mechanic", MechanicSchema);
