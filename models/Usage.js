// models/Usage.js
const { Schema } = require("mongoose");
const mongoose = require("../config/Mongodb_config");


const UsageSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date }
});

module.exports = mongoose.model("Usage", UsageSchema);