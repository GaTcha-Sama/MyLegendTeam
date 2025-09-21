import { Player } from "./players";

export interface TeamSelectorProps {
  selectedTeam: string;
  onSelectTeam: (team: string) => void;
  players: Player[];
  selectedSport: string;
}