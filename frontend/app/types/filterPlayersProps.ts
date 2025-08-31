import { Player } from './players';

export interface FilterPlayersProps {
  onFilterChange: (players: Player[]) => void;
  players: Player[];
  selectedSport: string;
  isPlayerInTeam: (playerId: number) => boolean;
  selectedNationality: string[];
  selectedPosition: string;
  selectedTeam: string[];
  selectedActiveRetiredStared: number | null | "legendary";
}