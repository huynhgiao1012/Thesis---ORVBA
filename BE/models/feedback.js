const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    garageId: {
      type: mongoose.Types.ObjectId,
      ref: "Garage",
    },
    formID: {
      type: mongoose.Types.ObjectId,
      ref: "OrderForm",
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Feedback",
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
