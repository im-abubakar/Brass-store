const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    name: {
      type: String,
      required: true,   
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
