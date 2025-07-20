import axios from "axios";
import { Player } from "../app/types/players";

// Plus besoin d'URL externe, tout est sur le même domaine
export const fetchPlayers = async (sport?: string): Promise<Player[]> => {
  try {
    const url = sport ? `/api/players?sport=${sport}` : '/api/players';
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs:', error);
    throw error;
  }
};
