DROP TABLE IF EXISTS players;

DROP TABLE IF EXISTS positions;

DROP TABLE IF EXISTS teams;

DROP TABLE IF EXISTS nationalities;

DROP TABLE IF EXISTS sports;

DROP TABLE IF EXISTS users;

CREATE TABLE sports (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE nationalities (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(3) NOT NULL UNIQUE,
    flag TEXT NOT NULL
);

CREATE TABLE teams (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    team_logo TEXT NOT NULL,
    sport_id INTEGER,
    FOREIGN KEY (sport_id) REFERENCES sports (id)
);

CREATE TABLE positions (
    id INTEGER PRIMARY KEY,
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
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    nationality1_id INTEGER,
    nationality2_id INTEGER,
    position1_id INTEGER,
    position2_id INTEGER,
    sport_id INTEGER,
    team1_id INTEGER,
    team2_id INTEGER,
    team3_id INTEGER,
    actual_team_id INTEGER,
    legendary_player INTEGER,
    photo TEXT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (nationality1_id) REFERENCES nationalities (id),
    FOREIGN KEY (nationality2_id) REFERENCES nationalities (id),
    FOREIGN KEY (position1_id) REFERENCES positions (id),
    FOREIGN KEY (position2_id) REFERENCES positions (id),
    FOREIGN KEY (sport_id) REFERENCES sports (id),
    FOREIGN KEY (team1_id) REFERENCES teams (id),
    FOREIGN KEY (team2_id) REFERENCES teams (id),
    FOREIGN KEY (team3_id) REFERENCES teams (id),
    FOREIGN KEY (actual_team_id) REFERENCES teams (id),
    FOREIGN KEY (legendary_player) REFERENCES players (id)
);