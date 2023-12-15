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
  // Trạng thái bàn (vd: "available", "occupied", "reserved")
  status: {
    type: String,
    required: true,
  },
  // ID nhà hàng mà bàn thuộc về
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
