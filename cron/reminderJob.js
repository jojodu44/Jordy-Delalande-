const cron = require('node-cron');
const Reminder = require('../models/Reminder');

module.exports = function startReminderJob() {
  // Vérifie toutes les minutes
  cron.schedule('*/1 * * * *', async () => {
    const now = new Date();
    const soon = new Date(now.getTime() + 60 * 60 * 1000); // dans l'heure

    const reminders = await Reminder.find({
      date: { $lte: soon },
      sent: false
    }).populate('owner pet');

    for (const r of reminders) {
      // TODO : envoyer email ou push ici
      console.log(`🔔 Rappel pour ${r.owner.email}: ${r.title} (${r.pet?.name || '—'}) le ${r.date}`);
      r.sent = true;
      await r.save();
    }
  });
};