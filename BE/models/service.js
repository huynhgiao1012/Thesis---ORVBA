const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema(
  {
    garageId: {
      type: Schema.Types.ObjectId,
      ref: "Garage",
    },
    serviceName: {
      type: String,
      required: [true, "Service's name is required"],
    },
    estimatedPrice: {
      type: Number,
      required: [true, "Estimated price is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Service",
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
