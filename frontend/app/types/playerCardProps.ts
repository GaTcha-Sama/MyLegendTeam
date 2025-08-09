import { Player as PlayerType } from "./players";
import { Theme } from "./sports";

export interface PlayerCardProps {
  player: PlayerType;
  theme: Theme;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}
