import { Player } from "./players";
import { Theme } from "./sports";

export interface PlayerCardProps {
  player: Player;
  theme: Theme;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  selectedPosition?: string; // Nouvelle prop pour la position sélectionnée
}
