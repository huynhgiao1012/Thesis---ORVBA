const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const OTPSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    otp: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      expires: 10800, // 3min
    },
  },
  {
    collection: "Otps",
    timestamps: true,
  }
);
OTPSchema.pre("save", function (next) {
  if (!this.isModified("otp")) return next();
  const salt = bcrypt.genSaltSync(); //round : độ phức tạp , thời gian cần 2^10
  const hashedOTP = bcrypt.hashSync(this.otp, salt);
  this.otp = hashedOTP;
  next();
});
module.exports = mongoose.model("OTP", OTPSchema);
