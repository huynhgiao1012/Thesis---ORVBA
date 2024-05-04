const mongoose = require("mongoose");
const { FORM_STATUS, PAYTYPE } = require("../constant");
const Schema = mongoose.Schema;
const OrderFormSchema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    managerId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    mechanicId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    accountantId: {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
    garageId: {
      type: mongoose.Types.ObjectId,
      ref: "Garage",
    },
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      require: [true, "Phone number is required"],
    },
    service: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    automaker: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: FORM_STATUS,
      default: FORM_STATUS.AWAIT,
    },
    isFeedback: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    note: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    imgAf: {
      type: String,
      required: true,
    },
    imgBf: {
      type: String,
      required: true,
    },
    carSpares: {
      type: Array,
      default: [],
    },
    payType: {
      type: String,
      enum: PAYTYPE,
      required: [true, "Payment type is required"],
      default: PAYTYPE.CASH,
    },
    creatAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "OrderForm",
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderForm", OrderFormSchema);
