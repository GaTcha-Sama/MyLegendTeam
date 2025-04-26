const db = require('../database/config');

const positionController = {
    getAllPositions: (req, res) => {
        const sportId = req.query.sport_id;
        let query = 'SELECT * FROM positions';
        let params = [];

        if (sportId) {
            query += ' WHERE sport_id = ?';
            params.push(sportId);
        }

        query += ' ORDER BY name';

        db.all(query, params, (err, positions) => {
            if (err) {
                console.error('Erreur lors de la récupération des positions:', err);
                return res.status(500).json({ error: 'Erreur lors de la récupération des positions' });
            }
            res.json(positions);
        });
    }
};

module.exports = positionController;
