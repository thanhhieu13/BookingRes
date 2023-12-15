const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 200
  },
  image: {
    type: String // Assuming you store the image URL
  },
  price: {
    type: Number
  }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
