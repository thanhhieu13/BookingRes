const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String, // Mô tả chung cho nhà hàng
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Đường dẫn của hình ảnh hoặc có thể sử dụng một loại lưu trữ khác cho hình ảnh
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
