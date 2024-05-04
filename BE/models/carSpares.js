const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarSparesSchema = new Schema(
  {
    garageId: {
      type: Schema.Types.ObjectId,
      ref: "Garage",
    },
    accountantId: {
      type: Schema.Types.ObjectId,
      ref: "Accountant",
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    img: {
      type: String,
      required: [true, "Image is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "CarSpares",
    timestamps: true,
  }
);

module.exports = mongoose.model("CarSpares", CarSparesSchema);
