// backend/routes/reminders.js
const express = require("express");
const Reminder = require("../models/Reminder"); // Assure-toi d'avoir créé ce modèle
const { protect } = require("../middleware/auth"); // ✅ destructuration correcte

const router = express.Router();

// Créer un rappel
router.post("/", protect, async (req, res) => {
  try {
    const { title, date, petId } = req.body;
    if (!title || !date || !petId) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const reminder = await Reminder.create({
      user: req.user._id,
      pet: petId,
      title,
      date,
    });

    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer les rappels de l'utilisateur connecté
router.get("/", protect, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).sort({ date: 1 });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Supprimer un rappel
router.delete("/:id", protect, async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, user: req.user._id });
    if (!reminder) return res.status(404).json({ message: "Rappel introuvable" });

    await reminder.remove();
    res.json({ message: "Rappel supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;