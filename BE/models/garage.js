const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const GarageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must have at least 3 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      unique: true,
      require: [true, "Phone number is required"],
      unique: true,
    },
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
    },
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    openTime: {
      type: String,
      required: [true, "Open time is required"],
    },
    closeTime: {
      type: String,
      required: [true, "Close time is required"],
    },
    transferInfo: {
      type: Array,
      default: [],
      required: [true, "Transfer information is required"],
    },
    img: {
      type: Array,
      default: [],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Garage",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Garage", GarageSchema);
