const db = require('../database/config');

class Player {
    static getAll(callback) {
        const query = `
            SELECT 
                p.id,
                p.name,
                p.lastname,
                n.name as nationality,
                n.flag,
                s.name as sport,
                pos.name as position,
                p.photo,
                t.name as team,
                t.team_logo
            FROM players p
            LEFT JOIN nationalities n ON p.nationality_id = n.id
            LEFT JOIN teams t ON p.team_id = t.id
            LEFT JOIN positions pos ON p.position_id = pos.id
            LEFT JOIN sports s ON p.sport_id = s.id
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Erreur SQL:', err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    }

    static getBySport(sport, callback) {
        const query = `
            SELECT 
                p.id,
                p.name,
                p.lastname,
                n.name as nationality,
                n.flag,
                s.name as sport,
                pos.name as position,
                p.photo,
                t.name as team,
                t.team_logo
            FROM players p
            LEFT JOIN nationalities n ON p.nationality_id = n.id
            LEFT JOIN teams t ON p.team_id = t.id
            LEFT JOIN positions pos ON p.position_id = pos.id
            LEFT JOIN sports s ON p.sport_id = s.id
            WHERE s.name = ?
        `;
        db.all(query, [sport], (err, rows) => {
            if (err) {
                console.error('Erreur SQL:', err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    }

    static create(playerData, callback) {
        const {
            name,
            lastname,
            nationality_id,
            position_id,
            sport_id,
            team_id,
            photo
        } = playerData;

        const query = `
            INSERT INTO players (name, lastname, nationality_id, position_id, sport_id, team_id, photo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(query, 
            [name, lastname, nationality_id, position_id, sport_id, team_id, photo],
            function(err) {
                if (err) {
                    return callback(err, null);
                }
                callback(null, { id: this.lastID, ...playerData });
            }
        );
    }
}

module.exports = Player; 