const db = require('../database/config');

const sportController = {
    getAllSports: (req, res) => {
        const query = 'SELECT * FROM sports';
        db.all(query, [], (err, sports) => {
            if (err) {
                console.error('Erreur lors de la récupération des sports:', err);
                return res.status(500).json({ error: 'Erreur lors de la récupération des sports' });
            }
            res.json(sports);
        });
    }
};

module.exports = sportController;
