const db = require('../database/config');

class Player {
    static getAll(callback) {
        console.log('Tentative de récupération de tous les joueurs...');
        db.all('SELECT * FROM players', callback);
    }

    static getBySport(sport, callback) {
        console.log('Récupération des joueurs du sport:', sport);
        db.all('SELECT * FROM players WHERE sport = ?', [sport], callback);
    }
}

module.exports = Player; 