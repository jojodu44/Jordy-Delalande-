// backend/middleware/subscriptionCheck.js
const Subscription = require("../models/Subscription");

module.exports = async function subscriptionCheck(req, res, next) {
  try {
    const sub = await Subscription.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (!sub || sub.status !== "active") {
      return res.status(403).json({ message: "Abonnement requis pour accéder à cette fonctionnalité" });
    }
    // Optionnel : vérifier date currentPeriodEnd
    if (sub.currentPeriodEnd && new Date(sub.currentPeriodEnd) < new Date()) {
      return res.status(403).json({ message: "Abonnement expiré" });
    }
    req.subscription = sub;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};