import axios from 'axios';
import { Player } from "../app/types/players";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

if (typeof window !== 'undefined') {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    return config;
  });
}

export const fetchPlayers = async (sport?: string): Promise<Player[]> => {
  const capitalizedSport = sport ? sport.charAt(0).toUpperCase() + sport.slice(1) : undefined;
  const url = capitalizedSport ? `${API_BASE_URL}/players?sport=${capitalizedSport}` : `${API_BASE_URL}/players`;
  const response = await axios.get(url);
  return response.data;
};

export const registerUser = async (email: string, password: string, username: string) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, { email, password, username });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return res.data;
};

export const getMe = async () => {
  const res = await axios.get(`${API_BASE_URL}/me`);
  return res.data;
};
