require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const playerController = require("./controllers/playerController");

const app = express();

// Middleware de sécurité
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par fenêtre
    message: {
        error: 'Trop de requêtes, veuillez réessayer plus tard.'
    }
});
app.use(limiter);

app.use(express.json());

// Configuration CORS sécurisée
const allowedOrigins = [
  'http://localhost:3000',
  'https://mylegendteam.vercel.app', // Remplacez par votre domaine Vercel
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS bloqué pour:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.get("/players", playerController.getAllPlayers);
// app.get("/players/:id", playerController.getPlayerById);
// app.post("/players", playerController.createPlayer);
// app.put("/players/:id", playerController.updatePlayer);
// app.delete("/players/:id", playerController.deletePlayer);

app.get("/", (req, res) => {
  res.send("API MyLegendTeam fonctionne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
