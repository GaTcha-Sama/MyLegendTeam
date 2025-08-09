import { Player } from "./players";

export interface PositionSelectorProps {
    selectedPosition: string;
    onSelectPosition: (position: string) => void;
    players: Player[];
    selectedSport: string;
  }