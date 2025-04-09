-- Fichier de requêtes SQL pour MyLegendTeam
-- Ce fichier contient la structure de la base de données

CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    sport VARCHAR(50) NOT NULL,
    image_path TEXT NOT NULL
);