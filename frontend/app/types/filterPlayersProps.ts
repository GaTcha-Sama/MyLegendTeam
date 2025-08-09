import { Player } from './players';

export interface FilterPlayersProps {
  onFilterChange: (filteredPlayers: Player[]) => void;
  players: Player[];
  selectedSport: string;
  isPlayerInTeam: (playerId: number) => boolean;
  selectedNationality: string;
  selectedPosition: string;
  selectedTeam: string;
  selectedActiveRetired: number | null;
}