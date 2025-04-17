require("dotenv").config();
const express = require("express");
const cors = require("cors");
const playerController = require("./controllers/playerController");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/players", playerController.getAllPlayers);
// app.get("/players/:id", playerController.getPlayerById);
// app.post("/players", playerController.createPlayer);
// app.put("/players/:id", playerController.updatePlayer);
// app.delete("/players/:id", playerController.deletePlayer);

app.get("/", (req, res) => {
  res.send("API MyLegendTeam fonctionne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
