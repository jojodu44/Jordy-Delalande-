const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./db");

const SALT_ROUNDS = 10;

async function seed() {
  try {
    console.log("🚀 Création des tables si elles n'existent pas...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS demarches (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        demarche_id INT REFERENCES demarches(id) ON DELETE SET NULL,
        filename VARCHAR(255),
        original_name VARCHAR(255),
        mimetype VARCHAR(100),
        size INT,
        path VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        message TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Tables créées");

    console.log("🚀 Insertion des utilisateurs...");

    const users = [
      { name: "Alice Dupont", email: "alice@example.com", password: "password123", role: "user" },
      { name: "Jordy Dev", email: "jordy@example.com", password: "admin123", role: "admin" },
      { name: "Marc Martin", email: "marc@example.com", password: "test123", role: "user" }
    ];

    const hashedUsers = await Promise.all(
      users.map(async u => ({
        ...u,
        password_hash: await bcrypt.hash(u.password, SALT_ROUNDS)
      }))
    );

    const userIds = [];
    for (const u of hashedUsers) {
      const res = await db.query(
        "INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id",
        [u.name, u.email, u.password_hash, u.role]
      );
      userIds.push(res.rows[0].id);
    }

    console.log("✅ Utilisateurs insérés");

    console.log("🚀 Insertion des démarches...");

    const demarches = [
      { user_id: userIds[0], title: "Demande d’AAH à la MDPH", status: "en cours" },
      { user_id: userIds[1], title: "Déclaration d’impôts 2024", status: "validée" },
      { user_id: userIds[2], title: "Demande de carte mobilité inclusion", status: "refusée" }
    ];

    const demarcheIds = [];
    for (const d of demarches) {
      const res = await db.query(
        "INSERT INTO demarches (user_id, title, status) VALUES ($1,$2,$3) RETURNING id",
        [d.user_id, d.title, d.status]
      );
      demarcheIds.push(res.rows[0].id);
    }

    console.log("✅ Démarches insérées");

    console.log("🚀 Insertion des documents...");

    const documents = [
      { demarche_id: demarcheIds[0], file_path: "/uploads/aah_dossier.pdf" },
      { demarche_id: demarcheIds[1], file_path: "/uploads/impots_2024.pdf" },
      { demarche_id: demarcheIds[2], file_path: "/uploads/carte_mobilite.png" }
    ];

    for (let i = 0; i < documents.length; i++) {
      await db.query(
        "INSERT INTO documents (user_id, demarche_id, path) VALUES ($1,$2,$3)",
        [userIds[i], documents[i].demarche_id, documents[i].file_path]
      );
    }

    console.log("✅ Documents insérés");

    console.log("🚀 Insertion des notifications...");

    const notifications = [
      { user_id: userIds[0], message: "Votre dossier AAH est en cours de traitement", is_read: false },
      { user_id: userIds[1], message: "Votre déclaration d’impôts a été validée ✅", is_read: true },
      { user_id: userIds[2], message: "Votre demande de carte mobilité a été refusée ❌", is_read: false }
    ];

    for (const n of notifications) {
      await db.query(
        "INSERT INTO notifications (user_id, message, is_read) VALUES ($1,$2,$3)",
        [n.user_id, n.message, n.is_read]
      );
    }

    console.log("✅ Notifications insérées");
    console.log("🎉 Seed terminé avec succès !");
    process.exit(0);

  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
    process.exit(1);
  }
}

seed();