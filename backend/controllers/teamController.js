const db = require('../database/config');

const teamController = {
    getAllTeams: (req, res) => {
        const sportId = req.query.sport_id;
        let query = 'SELECT * FROM teams';
        let params = [];

        if (sportId) {
            query += ' WHERE sport_id = ?';
            params.push(sportId);
        }

        query += ' ORDER BY name';

        db.all(query, params, (err, teams) => {
            if (err) {
                console.error('Erreur lors de la récupération des équipes:', err);
                return res.status(500).json({ error: 'Erreur lors de la récupération des équipes' });
            }
            res.json(teams);
        });
    }
};

module.exports = teamController;
