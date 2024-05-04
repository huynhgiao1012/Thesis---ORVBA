const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubCarSparesSchema = new Schema(
  {
    carSpareId: {
      type: Schema.Types.ObjectId,
      ref: "CarSpares",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    number: {
      type: Number,
      default: 5,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "SubCarSpares",
    timestamps: true,
  }
);

module.exports = mongoose.model("SubCarSpares", SubCarSparesSchema);
