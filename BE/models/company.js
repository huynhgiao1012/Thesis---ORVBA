const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const CompanySchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    long: {
      type: Number,
      required: [true, "Longtitude is required"],
    },
    lat: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    openTime: {
      type: String,
      required: [true, "Open time is required"],
    },
    closeTime: {
      type: String,
      required: [true, "close time is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Company",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Company", CompanySchema);
