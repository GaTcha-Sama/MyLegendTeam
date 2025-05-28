DROP TABLE IF EXISTS players;

DROP TABLE IF EXISTS positions;

DROP TABLE IF EXISTS teams;

DROP TABLE IF EXISTS nationalities;

DROP TABLE IF EXISTS sports;

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

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    nationality_id INTEGER,
    position_id INTEGER,
    sport_id INTEGER,
    team_id INTEGER,
    photo TEXT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (nationality_id) REFERENCES nationalities (id),
    FOREIGN KEY (position_id) REFERENCES positions (id),
    FOREIGN KEY (sport_id) REFERENCES sports (id),
    FOREIGN KEY (team_id) REFERENCES teams (id)
);