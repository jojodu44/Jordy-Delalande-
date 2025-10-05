import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import db from "../db.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Upload document
router.post("/upload", authenticate, upload.single("document"), async (req, res) => {
  const { demarche_id } = req.body;
  if (!req.file) return res.status(400).json({ message: "Fichier manquant" });

  try {
    const result = await db.query(
      "INSERT INTO documents (demarche_id, file_path) VALUES ($1, $2) RETURNING *",
      [demarche_id, `/uploads/${req.file.filename}`]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;