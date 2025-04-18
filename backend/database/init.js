const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'mylegendteam.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données SQLite');

    const schema = fs.readFileSync(path.join(__dirname, 'queries.sql'), 'utf8');
    db.exec(schema, (err) => {
        if (err) {
            console.error('Erreur création structure:', err);
            return;
        }
        console.log('Structure de la base de données créée');

        const playersData = require('../data/players.json');

        const stmt = db.prepare(`
            INSERT INTO players (id, name, lastname, nationality, position, sport, photo, team, team_logo, flag)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        let inserted = 0;
        playersData.players.forEach(player => {
            stmt.run(
                [
                    player.id,
                    player.name,
                    player.lastname,
                    player.nationality,
                    player.position,
                    player.sport,
                    player.photo,
                    player.team,
                    player.team_logo,
                    player.flag
                ],
                function(err) {
                    if (err) {
                        console.error('Erreur insertion joueur:', player.name, err);
                    } else {
                        inserted++;
                        console.log(`Joueur inséré: ${player.name} ${player.lastname} (${player.sport})`);
                    }
                }
            );
        });

        stmt.finalize(() => {
            console.log(`Insertion terminée. ${inserted} joueurs insérés.`);
            
            db.get('SELECT COUNT(*) as count FROM players', (err, row) => {
                if (err) {
                    console.error('Erreur comptage:', err);
                } else {
                    console.log(`Nombre total de joueurs en base: ${row.count}`);
                }
                db.close();
            });
        });
    });
});
