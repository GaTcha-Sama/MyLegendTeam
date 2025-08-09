require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const playerController = require("./controllers/playerController");

const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par fenêtre
    message: {
        error: 'Trop de requêtes, veuillez réessayer plus tard.'
    }
});
app.use(limiter);

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://mylegendteam.vercel.app',
  'https://my-legend-team.vercel.app',
  'https://my-legend-team-mukxydg0p-gatchas-projects.vercel.app',
  'https://*.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (origin && origin.startsWith('http://localhost:')) {
            console.log('Origin localhost autorisé:', origin);
            return callback(null, true);
        }
        
        if (origin.includes('vercel.app') || allowedOrigins.includes(origin)) {
            console.log('Origin autorisé:', origin);
            callback(null, true);
        } else {
            console.log('Origin bloqué:', origin);
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
