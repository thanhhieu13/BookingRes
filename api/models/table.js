const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  // Số bàn
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  // Số chỗ ngồi
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "occupied", "reserved"],
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
