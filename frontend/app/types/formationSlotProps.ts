import { Player as PlayerType } from "./players";
import { Theme, Sport } from "./sports";

export interface FormationSlotProps {
  position: string;
  player: PlayerType | null;
  onDropPlayer: (position: string, player: PlayerType | null) => void;
  isPlayerAlreadyPlaced: boolean;
  theme: Theme;
  positionId: string;
  sport: Sport;
  draggedPlayer?: PlayerType | null;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  enforceLegendaryLimit: boolean;
  team: { [key: string]: PlayerType | null };
}
