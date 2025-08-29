import { Player } from "./players";

export interface TeamSelectorProps {
  selectedTeam: string[];
  onSelectTeam: (teams: string[]) => void;
  players: Player[];
  selectedSport: string;
}