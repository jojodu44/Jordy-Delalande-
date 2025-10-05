import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
import authRoutes from "./routes/auth.js";
// import other routes as needed

import db from "./db.js"; // connexion PostgreSQL

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, config.uploadDir)));

// Routes
app.use("/auth", authRoutes);
// app.use("/users", usersRoutes);
// app.use("/demarches", demarchesRoutes);
// app.use("/documents", documentsRoutes);
// app.use("/notifications", notificationsRoutes);

// Health check
app.get("/ping", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.send("Backend fonctionne ✅"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur serveur" });
});

// Start server
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

export default app;
