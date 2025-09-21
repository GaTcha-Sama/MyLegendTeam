import { Sport } from "../types/sports";
import { Player } from "../types/players";

export const rugbyPositionSlotMapping: Record<string, string[]> = {
  "Prop": ["prop1", "prop2", "rugby_substitute1", "rugby_substitute2"],
  "Hooker": ["hooker", "rugby_substitute3"],
  "Lock": ["lock1", "lock2", "rugby_substitute4"],
  "Flanker": ["flanker1", "flanker2", "rugby_substitute5"],
  "Number 8": ["number8", "rugby_substitute5"],
  "Scrum half": ["scrumhalf", "rugby_substitute6"],
  "Fly half": ["flyhalf", "rugby_substitute7"],
  "Wing": ["wing1", "wing2", "rugby_substitute8"],
  "Center": ["center1", "center2", "rugby_substitute8"],
  "Full back": ["fullback", "rugby_substitute8"]
};

export const basketballPositionSlotMapping: Record<string, string[]> = {
  "Point guard": ["point", "basketball_substitute1"],
  "Shooting guard": ["shooting", "basketball_substitute2"],
  "Small forward": ["small", "basketball_substitute3"],
  "Power forward": ["power", "basketball_substitute4"],
  "Center": ["center", "basketball_substitute5"]
};

export const canPlayerBePlacedOnSlot = (player: Player, slotId: string, sport: Sport): boolean => {
  if (sport === "rugby" || sport === "basketball") {
    if (slotId.startsWith("rugby_substitute")) {
      return true;
    }
    
    const position1 = player.position1;
    const position2 = player.position2;
    
    if (position1) {
      const allowedSlots1 = sport === "rugby" ? rugbyPositionSlotMapping[position1] : basketballPositionSlotMapping[position1];
      if (allowedSlots1 && allowedSlots1.includes(slotId)) {
        return true;
      }
    }
    
    if (position2) {
      const allowedSlots2 = sport === "rugby" ? rugbyPositionSlotMapping[position2] : basketballPositionSlotMapping[position2];
      if (allowedSlots2 && allowedSlots2.includes(slotId)) {
        return true;
      }
    }
    
    return false;
  }
  
  return true;
};

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
