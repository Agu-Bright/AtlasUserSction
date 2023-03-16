const mongoose = require("mongoose");
const validator = require("validator");

const emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "This user already exists"],
    validate: [validator.isEmail, "Please Enter a valid email address"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("email", emailSchema);
