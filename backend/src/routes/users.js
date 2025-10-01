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

// Middleware admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux admins" });
  }
  next();
};

// Récupérer le profil de l'utilisateur connecté
router.get("/me", authenticate, async (req, res) => {
  try {
    const result = await db.query("SELECT id, name, email, role, created_at FROM users WHERE id=$1", [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Liste de tous les utilisateurs (admin uniquement)
router.get("/", authenticate, adminOnly, async (req, res) => {
  try {
    const result = await db.query("SELECT id, name, email, role, created_at FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;