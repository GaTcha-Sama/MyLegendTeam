require("dotenv").config();
const express = require("express");
const cors = require("cors");
const playerController = require("./controllers/playerController");
const sportController = require("./controllers/sportController");
const nationalityController = require("./controllers/nationalityController");
const positionController = require("./controllers/positionController");
const teamController = require("./controllers/teamController");

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // url frontend
    credentials: true
}));

app.use('/public', express.static('public'));

app.get("/players", playerController.getAllPlayers);
app.post("/players", playerController.createPlayer);
// app.get("/players/:id", playerController.getPlayerById);
// app.put("/players/:id", playerController.updatePlayer);
// app.delete("/players/:id", playerController.deletePlayer);

app.get("/sports", sportController.getAllSports);
app.get("/nationalities", nationalityController.getAllNationalities);
app.get("/positions", positionController.getAllPositions);
app.get("/teams", teamController.getAllTeams);

app.get("/", (req, res) => {
  res.send("API MyLegendTeam fonctionne !");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
