const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  // ID của nhà hàng mà menu thuộc về
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  // Tên mục thực phẩm hoặc đồ uống
  itemName: {
    type: String,
    required: true,
  },
  // Mô tả về mục thực phẩm hoặc đồ uống
  description: {
    type: String,
    required: true,
  },
  // Giá của mục thực phẩm hoặc đồ uống
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
