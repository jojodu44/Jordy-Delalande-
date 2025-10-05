-- 🔹 Insérer des utilisateurs avec mots de passe hashés
INSERT INTO users (name, email, password_hash, role) VALUES
('Alice Dupont', 'alice@example.com', '$2b$10$eB1y1FvTh7sFXN8aAoxnHezkW6YwVnE9g6rM7TIeFvhj4aQ8qfBzK', 'user'),
('Jordy Dev', 'jordy@example.com', '$2b$10$QOJYctJ3iW5sGZP0fhecYe5h4IopNcxYhLQEzF9zXzQwP6vB2YjFq', 'admin'),
('Marc Martin', 'marc@example.com', '$2b$10$APXa5/nk95pJ6VxU9mM0euz8bUep0Zph1Xrc7C4pUu1FrKn6y7QFu', 'user');

-- 🔹 Insérer des démarches
INSERT INTO demarches (user_id, title, status) VALUES
(1, 'Demande d’AAH à la MDPH', 'en cours'),
(2, 'Déclaration d’impôts 2024', 'validée'),
(3, 'Demande de carte mobilité inclusion', 'refusée');

-- 🔹 Insérer des documents
INSERT INTO documents (demarche_id, file_path) VALUES
(1, '/uploads/aah_dossier.pdf'),
(2, '/uploads/impots_2024.pdf'),
(3, '/uploads/carte_mobilite.png');


-- 🔹 Insérer des notifications
INSERT INTO notifications (user_id, message, is_read) VALUES
(1, 'Votre dossier AAH est en cours de traitement', FALSE),
(2, 'Votre déclaration d’impôts a été validée ✅', TRUE),
(3, 'Votre demande de carte mobilité a été refusée ❌', FALSE);