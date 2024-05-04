const mongoose = require("mongoose");
const { PAYTYPE } = require("../constant");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    payStatus: {
      type: Boolean,
      default: false,
      required: [true, "Payment status is required"],
    },
    payType: {
      type: String,
      enum: PAYTYPE,
      required: [true, "Payment type is required"],
    },
    formID: {
      type: mongoose.Types.ObjectId,
      ref: "OrderForm",
    },
    accountantId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
  },
  {
    collection: "payments",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Payment", PaymentSchema);
