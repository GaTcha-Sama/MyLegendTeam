import { Player } from "./players";

export interface NationalitySelectorProps {
  selectedNationality: string;
  onSelectNationality: (nationality: string) => void;
  players: Player[];
  selectedSport: string;
}
