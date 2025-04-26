const Player = require('../models/player');
const db = require('../database/config');
const sharp = require('sharp');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configuration de multer pour le stockage temporaire des fichiers
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // limite à 5MB
    }
}).single('photo');

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
    },
    createPlayer: async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: 'Erreur lors du téléchargement de l\'image' });
            }

            try {
                if (!req.file) {
                    return res.status(400).json({ error: 'La photo est obligatoire' });
                }

                const {
                    name,
                    lastname,
                    nationality_id,
                    position_id,
                    sport_id,
                    team_id
                } = req.body;

                // Validation des données
                if (!name || !lastname || !nationality_id || !position_id || !sport_id || !team_id) {
                    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
                }

                // Création du chemin pour sauvegarder l'image
                const photoDir = path.join('public', 'images', 'players');
                await fs.mkdir(photoDir, { recursive: true });

                // Génération du nom de fichier unique
                const filename = `${Date.now()}-${name}-${lastname}.webp`;
                const photoPath = path.join(photoDir, filename);

                // Conversion et sauvegarde de l'image en WebP
                await sharp(req.file.buffer)
                    .webp({ quality: 80 })
                    .toFile(photoPath);

                // Chemin relatif pour la base de données
                const dbPhotoPath = photoPath.replace(/\\/g, '/');

                const query = `
                    INSERT INTO players (name, lastname, nationality_id, position_id, sport_id, team_id, photo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                db.run(query, 
                    [name, lastname, nationality_id, position_id, sport_id, team_id, dbPhotoPath],
                    function(err) {
                        if (err) {
                            console.error('Erreur lors de la création du joueur:', err);
                            return res.status(500).json({ error: 'Erreur lors de la création du joueur' });
                        }

                        // Récupérer le joueur créé avec toutes ses relations
                        const selectQuery = `
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
                            WHERE p.id = ?
                        `;

                        db.get(selectQuery, [this.lastID], (err, player) => {
                            if (err) {
                                console.error('Erreur lors de la récupération du joueur créé:', err);
                                return res.status(500).json({ error: 'Erreur lors de la récupération du joueur créé' });
                            }
                            res.status(201).json(player);
                        });
                    }
                );
            } catch (error) {
                console.error('Erreur lors du traitement de l\'image:', error);
                res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
            }
        });
    }
};

module.exports = playerController; 