import { Sport } from "./sports";

export interface SavedTeam {
    id: string;
    name: string;
    sport: Sport;
    players: Record<string, { id: number; name: string } | null>;
    createdAt: string;
    updatedAt: string;
  }