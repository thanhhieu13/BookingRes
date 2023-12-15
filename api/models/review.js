const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // ID của nhà hàng mà đánh giá thuộc về
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  // ID của người đăng đánh giá
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Điểm đánh giá (vd: 1-5)
  rating: {
    type: Number,
    required: true,
  },
  // Nội dung đánh giá
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
