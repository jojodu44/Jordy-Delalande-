// backend/routes/pets.js
const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const { protect } = require("../middleware/auth");

// Lister les animaux de l'utilisateur connecté
router.get("/", protect, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id });
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Créer un animal
router.post("/", protect, async (req, res) => {
  try {
    const { name, species, breed, dob } = req.body;
    const pet = new Pet({ name, species, breed, dob, owner: req.user._id });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;