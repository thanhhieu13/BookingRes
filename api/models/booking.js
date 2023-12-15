const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // ID của bàn được đặt
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  // ID của người đặt
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Thời gian đặt bàn
  bookingTime: {
    type: Date,
    required: true,
  },
  // Số lượng khách
  numberOfGuests: {
    type: Number,
    required: true,
  },
  // Trạng thái đặt bàn (vd: "pending", "confirmed", "cancelled")
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
