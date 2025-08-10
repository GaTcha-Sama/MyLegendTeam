DROP TABLE IF EXISTS players;

DROP TABLE IF EXISTS positions;

DROP TABLE IF EXISTS teams;

DROP TABLE IF EXISTS nationalities;

DROP TABLE IF EXISTS sports;

DROP TABLE IF EXISTS users;

CREATE TABLE sports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE nationalities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(3) NOT NULL UNIQUE,
    flag TEXT NOT NULL
);

CREATE TABLE teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    team_logo TEXT NOT NULL,
    sport_id INTEGER,
    FOREIGN KEY (sport_id) REFERENCES sports (id)
);

CREATE TABLE positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    sport_id INTEGER,
    FOREIGN KEY (sport_id) REFERENCES sports (id)
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    nationality_id INTEGER,
    position_id INTEGER,
    sport_id INTEGER,
    team1_id INTEGER,
    team2_id INTEGER,
    team3_id INTEGER,
    photo TEXT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (nationality_id) REFERENCES nationalities (id),
    FOREIGN KEY (position_id) REFERENCES positions (id),
    FOREIGN KEY (sport_id) REFERENCES sports (id),
    FOREIGN KEY (team1_id) REFERENCES teams (id),
    FOREIGN KEY (team2_id) REFERENCES teams (id),
    FOREIGN KEY (team3_id) REFERENCES teams (id)
);