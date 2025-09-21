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
  onSlotClick?: (positionId: string) => void;
}

export const getPlayerPositionsForSlot = (slotId: string, sport: Sport): string[] => {
  if (sport === "rugby") {
    if (slotId.startsWith("rugby_substitute")) {
      return ["Prop", "Hooker", "Lock", "Flanker", "Number 8", "Scrum half", "Fly half", "Wing", "Center", "Full back"];
    }
    
    const slotToPositionMapping: Record<string, string[]> = {
      "prop1": ["Prop"],
      "prop2": ["Prop"],
      "hooker": ["Hooker"],
      "lock1": ["Lock"],
      "lock2": ["Lock"],
      "flanker1": ["Flanker"],
      "flanker2": ["Flanker"],
      "number8": ["Number 8"],
      "scrumhalf": ["Scrum half"],
      "flyhalf": ["Fly half"],
      "wing1": ["Wing"],
      "wing2": ["Wing"],
      "center1": ["Center"],
      "center2": ["Center"],
      "fullback": ["Full back"]
    };
    
    return slotToPositionMapping[slotId] || [];
  }
  
  if (sport === "basketball") {
    if (slotId.startsWith("basketball_substitute")) {
      return ["Point guard", "Shooting guard", "Small forward", "Power forward", "Center"];
    }
    
    const slotToPositionMapping: Record<string, string[]> = {
      "point": ["Point guard"],
      "shooting": ["Shooting guard"],
      "small": ["Small forward"],
      "power": ["Power forward"],
      "center": ["Center"]
    };
    
    return slotToPositionMapping[slotId] || [];
  }
  
  return [];
};
