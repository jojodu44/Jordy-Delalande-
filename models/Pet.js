const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: String,
  dob: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  records: [
    {
      date: Date,
      description: String,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.models.Pet || mongoose.model("Pet", petSchema);