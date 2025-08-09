import axios from "axios";
import { Player } from "../app/types/players";

//const API_BASE_URL = "https://mylegendteam.onrender.com";
const API_BASE_URL = "http://localhost:5000";

export const fetchPlayers = async (sport?: string): Promise<Player[]> => {
  try {
    // Capitaliser la première lettre pour correspondre à la DB
    const capitalizedSport = sport ? sport.charAt(0).toUpperCase() + sport.slice(1) : undefined;
    const url = capitalizedSport ? `${API_BASE_URL}/players?sport=${capitalizedSport}` : `${API_BASE_URL}/players`;
    const response = await axios.get(url);
    console.log('Données brutes reçues du backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des joueurs:', error);
    throw error;
  }
};
