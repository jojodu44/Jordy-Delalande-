// src/seed.js
import pool, { query } from './db.js';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log("🔹 Nettoyage des tables...");
    await query("DELETE FROM notifications");
    await query("DELETE FROM documents");
    await query("DELETE FROM demarches");
    await query("DELETE FROM users");

    console.log("🔹 Création des utilisateurs...");
    const users = [
      { name: "Alice Dupont", email: "alice@example.com", password: "password123", role: "user" },
      { name: "Jordy Dev", email: "jordy@example.com", password: "admin123", role: "admin" },
      { name: "Marc Martin", email: "marc@example.com", password: "marc123", role: "user" }
    ];

    for (const u of users) {
      const hash = await bcrypt.hash(u.password, 10);
      await query(
        "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
        [u.name, u.email, hash, u.role]
      );
    }

    console.log("🔹 Création des démarches...");
    await query(`
      INSERT INTO demarches (user_id, title, status) VALUES
      (1, 'Demande d’AAH à la MDPH', 'en cours'),
      (2, 'Déclaration d’impôts 2024', 'validée'),
      (3, 'Demande de carte mobilité inclusion', 'refusée')
    `);

    console.log("🔹 Création des documents...");
    await query(`
      INSERT INTO documents (demarche_id, file_path) VALUES
      (1, '/uploads/aah_dossier.pdf'),
      (2, '/uploads/impots_2024.pdf'),
      (3, '/uploads/carte_mobilite.png')
    `);

    console.log("🔹 Création des notifications...");
    await query(`
      INSERT INTO notifications (user_id, message, is_read) VALUES
      (1, 'Votre dossier AAH est en cours de traitement', FALSE),
      (2, 'Votre déclaration d’impôts a été validée ✅', TRUE),
      (3, 'Votre demande de carte mobilité a été refusée ❌', FALSE)
    `);

    console.log("✅ Seed terminé !");
    process.exit(0);
  } catch (err) {
    console.error("Erreur seed:", err);
    process.exit(1);
  }
}

seed();