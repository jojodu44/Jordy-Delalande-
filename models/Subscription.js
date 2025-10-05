// backend/models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true },
  status: { type: String, enum: ["active", "canceled", "past_due", "incomplete"], default: "active" },
  stripeSubscriptionId: { type: String, required: true },
  currentPeriodEnd: { type: Date }, // fin de période courante
}, { timestamps: true });

module.exports = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);