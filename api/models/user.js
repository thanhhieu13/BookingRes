const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
    verificationToken: String,
    address: {
      name: String,
      avatar: String,
      mobileNo: String,
      street: String,
      city: String,
      occupation: String,
      gender: String,
      dateOfBirth: Date,
  },
});

const User = mongoose.model("User",userSchema);

module.exports = User