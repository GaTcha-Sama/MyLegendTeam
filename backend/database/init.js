const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'mylegendteam.db');

// Fonction utilitaire pour exécuter des requêtes SQL
const runQuery = (db, query) => {
    return new Promise((resolve, reject) => {
        db.run(query, function(err) {
            if (err) {
                console.error('Erreur SQL:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Fonction pour récupérer des données
const getAllRows = (db, query) => {
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Erreur de récupération:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Fonction pour insérer les données
const insertData = async (db, tableName, data, columns) => {
    if (!data || data.length === 0) {
        console.log(`Aucune donnée à insérer dans ${tableName}`);
        return;
    }

    const placeholders = columns.map(() => '?').join(',');
    const stmt = db.prepare(`
        INSERT INTO ${tableName} (${columns.join(',')})
        VALUES (${placeholders})
    `);

    for (const item of data) {
        await new Promise((resolve, reject) => {
            const values = columns.map(col => item[col]);
            stmt.run(values, (err) => {
                if (err) {
                    console.error(`Erreur d'insertion dans ${tableName}:`, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    return new Promise((resolve, reject) => {
        stmt.finalize(err => {
            if (err) reject(err);
            else resolve();
        });
    });
};

// Fonction pour sauvegarder les users existants
const backupUsers = async () => {
    if (!fs.existsSync(dbPath)) {
        console.log('Aucune base de données existante, pas de users à sauvegarder');
        return [];
    }

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, async (err) => {
            if (err) {
                console.error('Erreur d\'ouverture de la base de données:', err);
                resolve([]); // Continue même si erreur
                return;
            }

            try {
                // Vérifier si la table users existe
                const tableExists = await getAllRows(db, 
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
                );

                if (tableExists.length === 0) {
                    console.log('Table users inexistante, pas de sauvegarde nécessaire');
                    db.close();
                    resolve([]);
                    return;
                }

                const users = await getAllRows(db, 'SELECT * FROM users');
                console.log(`${users.length} user(s) sauvegardé(s)`);
                db.close();
                resolve(users);
            } catch (error) {
                console.error('Erreur lors de la sauvegarde des users:', error);
                db.close();
                resolve([]); // Continue même si erreur
            }
        });
    });
};

const initDatabase = async () => {
    // Sauvegarde les users avant de supprimer la base
    const savedUsers = await backupUsers();

    // Supprime la base de données existante si elle existe
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('Ancienne base de données supprimée');
    }

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, async (err) => {
            if (err) {
                console.error('Erreur de création de la base de données:', err);
                reject(err);
                return;
            }

            try {
                // Lecture du fichier SQL
                const schema = fs.readFileSync(path.join(__dirname, 'queries.sql'), 'utf8');
                
                // Séparation des requêtes SQL
                const queries = schema.split(';').filter(query => query.trim());
                
                // Exécution séquentielle des requêtes
                for (const query of queries) {
                    if (query.trim()) {
                        await runQuery(db, query);
                    }
                }

                console.log('Schéma de base de données créé avec succès');

                const sports = require('../data/sports.json').sports;
                await insertData(db, 'sports', sports, ['id', 'name']);
                console.log('Sports insérés');

                const nationalities = require('../data/nationalities.json').nationalities;
                await insertData(db, 'nationalities', nationalities, ['id', 'name', 'code', 'flag']);
                console.log('Nationalités insérées');

                const teams = require('../data/teams.json').teams;
                await insertData(db, 'teams', teams, ['id', 'name', 'team_logo', 'sport_id']);
                console.log('Équipes insérées');

                const positions = require('../data/positions.json').positions;
                await insertData(db, 'positions', positions, ['id', 'name', 'sport_id']);
                console.log('Positions insérées');

                const players = require('../data/players.json').players;
                await insertData(db, 'players', players, [
                    'id', 
                    'name', 
                    'lastname', 
                    'nationality1_id', 
                    'nationality2_id',
                    'position1_id', 
                    'position2_id', 
                    'sport_id', 
                    'team1_id', 
                    'team2_id', 
                    'team3_id', 
                    'actual_team_id',
                    'legendary_player',
                    'photo',
                    'active'
                ]);
                console.log('Joueurs insérés');

                // Restauration des users sauvegardés
                if (savedUsers.length > 0) {
                    await insertData(db, 'users', savedUsers, [
                        'id',
                        'username',
                        'password_hash',
                        'email',
                        'created_at'
                    ]);
                    console.log(`${savedUsers.length} user(s) restauré(s)`);
                }

                console.log('Base de données initialisée avec succès !');
                resolve();
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de la base de données:', error);
                reject(error);
            } finally {
                db.close();
            }
        });
    });
};

// Exécution de l'initialisation
initDatabase()
    .then(() => {
        console.log('Initialisation terminée avec succès');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Erreur lors de l\'initialisation:', err);
        process.exit(1);
    });
