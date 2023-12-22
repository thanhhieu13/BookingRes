const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  selectedHour: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
