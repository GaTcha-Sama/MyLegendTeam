const Player = require('../models/player');

const playerController = {
    getAllPlayers: (req, res) => {
        const sport = req.query.sport; // Permet de filtrer avec /players?sport=Rugby
        
        if (sport) {
            // Si un sport est spécifié, filtrer les joueurs
            Player.getBySport(sport, (err, players) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
                }
                res.json(players);
            });
        } else {
            // Sinon, retourner tous les joueurs
            Player.getAll((err, players) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
                }
                res.json(players);
            });
        }
    }
};

module.exports = playerController; 