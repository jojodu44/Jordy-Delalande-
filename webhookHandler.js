// backend/webhookHandler.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Subscription = require("./models/Subscription");
const User = require("./models/User");

module.exports = async function stripeWebhookHandler(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gère les événements pertinents
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // Récupère l'utilisateur via email (ou customer id si tu l'enregistres)
        const user = await User.findOne({ email: session.customer_email });
        if (user) {
          // Récupère la subscription depuis Stripe si présente
          const stripeSubscriptionId = session.subscription;
          // Récupérer la subscription complète depuis Stripe
          const stripeSub = await stripe.subscriptions.retrieve(stripeSubscriptionId);

          const planNickname = stripeSub.items.data[0].price.nickname || stripeSub.items.data[0].price.id;

          await Subscription.create({
            user: user._id,
            plan: planNickname,
            status: stripeSub.status,
            stripeSubscriptionId,
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000)
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        // Mettre à jour date de fin de période + statut
        const invoice = event.data.object;
        const stripeSubId = invoice.subscription;
        const stripeSub = await stripe.subscriptions.retrieve(stripeSubId);
        const sub = await Subscription.findOne({ stripeSubscriptionId: stripeSubId });
        if (sub) {
          sub.status = stripeSub.status;
          sub.currentPeriodEnd = new Date(stripeSub.current_period_end * 1000);
          await sub.save();
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const stripeSub = event.data.object;
        const sub = await Subscription.findOne({ stripeSubscriptionId: stripeSub.id });
        if (sub) {
          sub.status = stripeSub.status;
          sub.currentPeriodEnd = stripeSub.current_period_end ? new Date(stripeSub.current_period_end * 1000) : sub.currentPeriodEnd;
          await sub.save();
        }
        break;
      }

      default:
        // console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("Erreur traitement webhook:", err);
    // Ne pas renvoyer erreur 500 si possible - Stripe réessaiera
  }

  res.json({ received: true });
};