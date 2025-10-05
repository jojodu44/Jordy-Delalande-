-- Création de la table utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- user, admin, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table démarches
CREATE TABLE IF NOT EXISTS demarches (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(50) DEFAULT 'en cours', -- en cours, validée, refusée
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table documents
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    demarche_id INT REFERENCES demarches(id) ON DELETE CASCADE,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
