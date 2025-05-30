
// models/SearchLog.js
const { Schema } = require("mongoose");
const mongoose = require("../config/Mongodb_config");

const SearchLogSchema = new Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model("SearchLog", SearchLogSchema);