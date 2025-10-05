const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  date: { type: Date, required: true },
  note: String,
}, { timestamps: true });

module.exports = mongoose.models.Reminder || mongoose.model("Reminder", reminderSchema);