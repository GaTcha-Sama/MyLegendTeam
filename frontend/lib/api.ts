import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchPlayers = async () => {
  const response = await axios.get(`${API_BASE_URL}/players`);
  return response.data;
};
