const mongoose = require('mongoose');

const nameEnum = ['Mới nhất', 'Được yêu thích nhất', 'Nhà hàng sang trọng', 'Nhà hàng chất lượng quốc tế'];
const featuredSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: nameEnum,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
});

const Featured = mongoose.model('Featured', featuredSchema);

module.exports = Featured;
