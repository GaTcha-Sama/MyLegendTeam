import { Player } from "./players";

export interface ActiveRetiredSelectorProps {
    selectedActiveRetired: number | null;
    onSelectActiveRetired: (activeRetired: number | null) => void;
    players: Player[];
    selectedSport: string;
  }