import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

const router = express.Router();

// Middleware auth
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

// Récupérer toutes les démarches de l'utilisateur connecté
router.get("/", authenticate, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM demarches WHERE user_id=$1 ORDER BY created_at DESC", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Créer une nouvelle démarche
router.post("/", authenticate, async (req, res) => {
  const { title, status } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO demarches (user_id, title, status) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;