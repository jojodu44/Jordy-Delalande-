require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const messageRoutes = require('./routes/message.route');
const reminderRoutes = require('./routes/reminders');
const subscriptionRoutes = require('./routes/subscription');
const stripeWebhookHandler = require('./webhookHandler');

const app = express();

// IMPORTANT: ne pas appliquer express.json globalement pour webhook raw.
// On garde express.json mais on réservera la route webhook en raw below.
app.use(cors());
app.use(express.json());

// routes API normales
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/subscription', subscriptionRoutes);

// route webhook Stripe (RAW body)
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), stripeWebhookHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(PORT, () => console.log(`🚀 Serveur démarré sur :${PORT}`));
  })
  .catch(err => console.error('Erreur MongoDB :', err));