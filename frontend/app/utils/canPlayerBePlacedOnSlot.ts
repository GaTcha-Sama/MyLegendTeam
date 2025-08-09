import { Sport } from "../types/sports";

// Mapping des positions de joueurs vers les slots autorisés pour le rugby
export const rugbyPositionSlotMapping: Record<string, string[]> = {
  "Prop": ["prop1", "prop2", "rugby_substitute1", "rugby_substitute2"],
  "Hooker": ["hooker", "rugby_substitute3"],
  "Lock": ["lock1", "lock2", "rugby_substitute4"],
  "Flanker": ["flanker1", "flanker2", "number8", "rugby_substitute5"],
  "Scrum half": ["scrumhalf", "rugby_substitute6"],
  "Fly half": ["flyhalf", "rugby_substitute7"],
  "Wing": ["wing1", "wing2", "rugby_substitute8"],
  "Center": ["center1", "center2", "rugby_substitute8"],
  "Full back": ["fullback", "rugby_substitute8"]
};

// Fonction pour vérifier si un joueur peut être placé sur un slot
export const canPlayerBePlacedOnSlot = (playerPosition: string, slotId: string, sport: Sport): boolean => {
  if (sport === "rugby") {
    // Les slots de substitution sont toujours disponibles pour toutes les positions
    if (slotId.startsWith("rugby_substitute")) {
      return true;
    }
    
    // Vérifier si la position du joueur correspond aux slots autorisés
    const allowedSlots = rugbyPositionSlotMapping[playerPosition];
    return allowedSlots ? allowedSlots.includes(slotId) : false;
  }
  
  // Pour les autres sports, retourner true par défaut (pas de restriction implémentée)
  return true;
};
