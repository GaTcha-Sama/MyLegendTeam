import axios from "axios";
import { Player } from "../app/types/players";

// Utilisez l'URL de votre backend Render
const API_BASE_URL = "https://mylegendteam.onrender.com/";

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players`);
    console.log('Données brutes reçues du backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des joueurs:', error);
    throw error;
  }
};
