import axios from "axios";
import { Player } from "../app/data/players";

const API_BASE_URL = "http://localhost:5001"; // url backend

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
