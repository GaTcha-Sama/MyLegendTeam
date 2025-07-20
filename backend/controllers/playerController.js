const Player = require('../models/player');

const playerController = {
    getAllPlayers: (req, res) => {
        const sport = req.query.sport;
        
        if (sport) {
            Player.getBySport(sport, (err, players) => {
                if (err) {
                    console.error('Erreur lors de la récupération des joueurs:', err.message);
                    return res.status(500).json({ 
                        error: 'Erreur interne du serveur',
                        message: process.env.NODE_ENV === 'development' ? err.message : undefined
                    });
                }
                console.log(`${players.length} joueurs récupérés pour le sport: ${sport}`);
                res.json(players);
            });
        } else {
            Player.getAll((err, players) => {
                if (err) {
                    console.error('Erreur lors de la récupération des joueurs:', err.message);
                    return res.status(500).json({ 
                        error: 'Erreur interne du serveur',
                        message: process.env.NODE_ENV === 'development' ? err.message : undefined
                    });
                }
                console.log(`${players.length} joueurs récupérés au total`);
                res.json(players);
            });
        }
    }
};

module.exports = playerController; 
