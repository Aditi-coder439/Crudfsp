const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  name: String,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", orderSchema);