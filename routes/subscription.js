const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Subscription = require("../models/Subscription");

// ✅ importe correctement ton middleware d’authentification :
const { protect } = require("../middleware/auth");

// Remplace ces price IDs par ceux créés dans ton dashboard Stripe
const PRICE_IDS = {
  basic: "price_xxx_basic",    // ex: 19€/mois
  pro: "price_xxx_pro",        // ex: 49€/mois
  premium: "price_xxx_premium" // ex: 99€/mois
};

router.post("/create-checkout-session", protect, async (req, res) => {
  const { plan } = req.body;
  if (!PRICE_IDS[plan]) return res.status(400).json({ message: "Plan invalide" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: req.user.email, // permet d'associer le paiement au user
      line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Optionnel : annuler abonnement par l'utilisateur
router.post("/cancel", protect, async (req, res) => {
  try {
    const sub = await Subscription.findOne({ user: req.user._id });
    if (!sub) return res.status(404).json({ message: "Aucun abonnement trouvé" });

    // annule côté Stripe
    await stripe.subscriptions.del(sub.stripeSubscriptionId);
    sub.status = "canceled";
    await sub.save();
    res.json({ message: "Abonnement annulé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;