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
  // Thêm trường "type" để chỉ loại cửa hàng (vd: Pizza, Sushi, etc.)
  type: {
    type: String,
    required: true,
  },
  // Thêm trường "menu" để lưu trữ thông tin về menu của nhà hàng
  menu: {
    type: String,
    required: true,
  },

    // {
    //   itemName: {
    //     type: String,
    //     required: true,
    //   },
    //   description: {
    //     type: String,
    //     required: true,
    //   },
    //   price: {
    //     type: Number,
    //     required: true,
    //   },
    // },
  // Thêm trường "openingHours" để lưu trữ thông tin về giờ mở cửa
  openingHours: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
