const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    token: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // 1h
    },
  },
  {
    collection: "Token",
    timestamps: true,
  }
);

// obj giong voi primary key
// createAt from timestamps
// danh index
TokenSchema.index(
  { createAt: 1 },
  { expireAfterSeconds: +process.env.TOKEN_EXPIRED }
);
module.exports = mongoose.model("Token", TokenSchema);
