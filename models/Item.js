const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["folder", "file"], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  path: String, // only for files
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
