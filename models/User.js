// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // hashed if local login
  googleId: { type: String }, // for Google login
  name: { type: String },
  photo: { type: String },
  lastLogin: { type: Date },
  loginHistory: [{ timestamp: Date }]
});

module.exports = mongoose.model("User", UserSchema);