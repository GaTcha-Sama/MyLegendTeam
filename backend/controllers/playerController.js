const Player = require('../models/player');

const playerController = {
    getAllPlayers: (req, res) => {
        const sport = req.query.sport;
        
        if (sport) {
            Player.getBySport(sport, (err, players) => {
                if (err) {
                    console.error('Erreur lors de la récupération des joueurs:', err);
                    return res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
                }
                console.log('Joueurs récupérés:', players);
                res.json(players);
            });
        } else {
            Player.getAll((err, players) => {
                if (err) {
                    console.error('Erreur lors de la récupération des joueurs:', err);
                    return res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
                }
                console.log('Joueurs récupérés:', players);
                res.json(players);
            });
        }
    }
};

module.exports = playerController; 
