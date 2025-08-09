import { Player } from "./players";
import { Sport } from "./sports";

export interface SportSelectorProps {
    selectedSport: Sport;
    onSelectSport: (sport: Sport) => void;
    players: Player[];
  }