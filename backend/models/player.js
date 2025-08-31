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
                pos1.name as position1,
                pos2.name as position2,
                p.photo,
                t1.name as team1,
                t1.team_logo as team1_logo,
                t2.name as team2,
                t2.team_logo as team2_logo,
                t3.name as team3,
                t3.team_logo as team3_logo,
                actual.name as actual_team,
                actual.team_logo as actual_team_logo,
                p.legendary_player,
                p.active
            FROM players p
            LEFT JOIN nationalities n ON p.nationality_id = n.id
            LEFT JOIN teams t1 ON p.team1_id = t1.id
            LEFT JOIN teams t2 ON p.team2_id = t2.id
            LEFT JOIN teams t3 ON p.team3_id = t3.id
            LEFT JOIN teams actual ON p.actual_team_id = actual.id
            LEFT JOIN positions pos1 ON p.position1_id = pos1.id
            LEFT JOIN positions pos2 ON p.position2_id = pos2.id
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
                pos1.name as position1,
                pos2.name as position2,
                p.photo,
                t1.name as team1,
                t1.team_logo as team1_logo,
                t2.name as team2,
                t2.team_logo as team2_logo,
                t3.name as team3,
                t3.team_logo as team3_logo,
                actual.name as actual_team,
                actual.team_logo as actual_team_logo,
                p.legendary_player,
                p.active
            FROM players p
            LEFT JOIN nationalities n ON p.nationality_id = n.id
            LEFT JOIN teams t1 ON p.team1_id = t1.id
            LEFT JOIN teams t2 ON p.team2_id = t2.id
            LEFT JOIN teams t3 ON p.team3_id = t3.id
            LEFT JOIN teams actual ON p.actual_team_id = actual.id
            LEFT JOIN positions pos1 ON p.position1_id = pos1.id
            LEFT JOIN positions pos2 ON p.position2_id = pos2.id
            LEFT JOIN sports s ON p.sport_id = s.id
            WHERE LOWER(s.name) = LOWER(?)
        `;
        db.all(query, [sport], (err, rows) => {
            if (err) {
                console.error('Erreur SQL:', err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    }
}

module.exports = Player; 