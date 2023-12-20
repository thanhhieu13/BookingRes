const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  numberOfAdults: {
    type: Number,
    default: 1
  },
  numberOfChildren: {
    type: Number,
    default: 1
  },
  reservationDate: {
    type: Date,
  },
  reservationTime: {
    type: String, 
  },
  note: {
    type: String
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
