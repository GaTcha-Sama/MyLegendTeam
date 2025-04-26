const db = require('../database/config');

const nationalityController = {
    getAllNationalities: (req, res) => {
        const query = 'SELECT * FROM nationalities ORDER BY name';
        db.all(query, [], (err, nationalities) => {
            if (err) {
                console.error('Erreur lors de la récupération des nationalités:', err);
                return res.status(500).json({ error: 'Erreur lors de la récupération des nationalités' });
            }
            res.json(nationalities);
        });
    }
};

module.exports = nationalityController;
