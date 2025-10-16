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

export const footballPositionSlotMapping: Record<string, string[]> = {
  "Goalkeeper": ["goalkeeper", "football_substitute1"],
  "Defender": ["defender1", "defender2", "defender3", "defender4", "football_substitute2"],
  "Midfielder": ["midfielder1", "midfielder2", "midfielder3", "football_substitute3", "football_substitute4"],
  "Forward": ["forward1", "forward2", "forward3", "football_substitute5"]
};

export const hockeyPositionSlotMapping: Record<string, string[]> = {
  "Left wing": ["forward1", "forward4", "forward7", "forward10"],
  "Center": ["forward2", "forward5", "forward8", "forward11"],
  "Right wing": ["forward3", "forward6", "forward9", "forward12"],
  "Defender": ["defense1", "defense2", "defense3", "defense4", "defense5", "defense6"], 
  "Goalkeeper": ["goalie1", "goalie2"]
};

export const canPlayerBePlacedOnSlot = (player: Player, slotId: string, sport: Sport): boolean => {
  if (sport === "rugby" || sport === "basketball" || sport === "football" || sport === "hockey") {
    if (slotId.startsWith("rugby_substitute") || slotId.startsWith("basketball_substitute") || slotId.startsWith("football_substitute") || slotId.startsWith("hockey_substitute")) {
      return true;
    }
    
    const position1 = player.position1;
    const position2 = player.position2;
    
    if (position1) {
      const allowedSlots1 = sport === "rugby" 
        ? rugbyPositionSlotMapping[position1] 
        : sport === "basketball"
        ? basketballPositionSlotMapping[position1]
        : sport === "football"
        ? footballPositionSlotMapping[position1]
        : sport === "hockey"
        ? hockeyPositionSlotMapping[position1]
        : [];
      if (allowedSlots1 && allowedSlots1.includes(slotId)) {
        return true;
      }
    }
    
    if (position2) {
      const allowedSlots2 = sport === "rugby" 
        ? rugbyPositionSlotMapping[position2] 
        : sport === "basketball"
        ? basketballPositionSlotMapping[position2]
        : sport === "football"
        ? footballPositionSlotMapping[position2]
        : sport === "hockey"
        ? hockeyPositionSlotMapping[position2]
        : [];
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

  if (sport === "football") {
    if (slotId.startsWith("football_substitute")) {
      return ["Goalkeeper", "Defender", "Midfielder", "Forward"];
    }
    
    const slotToPositionMapping: Record<string, string[]> = {
      "goalkeeper": ["Goalkeeper"],
      "defender3": ["Defender"],
      "defender1": ["Defender"],
      "defender2": ["Defender"],
      "defender4": ["Defender"],
      "midfielder1": ["Midfielder"],
      "midfielder2": ["Midfielder"],
      "midfielder3": ["Midfielder"],
      "forward1": ["Forward"],
      "forward2": ["Forward"],
      "forward3": ["Forward"]
    };
    
    return slotToPositionMapping[slotId] || [];
  }

  if (sport === "hockey") {
    if (slotId.startsWith("hockey_substitute")) {
      return ["Left wing", "Center", "Right wing", "Defender", "Goalkeeper"];
    }
    
    const slotToPositionMapping: Record<string, string[]> = {
      "forward1": ["Left wing", "Center", "Right wing"],
      "forward2": ["Left wing", "Center", "Right wing"],
      "forward3": ["Left wing", "Center", "Right wing"],
      "forward4": ["Left wing", "Center", "Right wing"],
      "forward5": ["Left wing", "Center", "Right wing"],
      "forward6": ["Left wing", "Center", "Right wing"],
      "forward7": ["Left wing", "Center", "Right wing"],
      "forward8": ["Left wing", "Center", "Right wing"],
      "forward9": ["Left wing", "Center", "Right wing"],
      "forward10": ["Left wing", "Center", "Right wing"],
      "forward11": ["Left wing", "Center", "Right wing"],
      "forward12": ["Left wing", "Center", "Right wing"],
      "defense1": ["Defender"],
      "defense2": ["Defender"],
      "defense3": ["Defender"],
      "defense4": ["Defender"],
      "defense5": ["Defender"],
      "defense6": ["Defender"],
      "goalie1": ["Goalkeeper"],
      "goalie2": ["Goalkeeper"]
    };
    
    return slotToPositionMapping[slotId] || [];
  }
  
  return [];
};
