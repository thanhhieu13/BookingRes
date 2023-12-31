const mongoose = require('mongoose');

const featuredSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  image: {
    type: String // Assuming you store the image URL
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
