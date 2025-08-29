import { Player } from "./players";

export interface NationalitySelectorProps {
  selectedNationality: string[];
  onSelectNationality: (nationalities: string[]) => void;
  players: Player[];
  selectedSport: string;
}