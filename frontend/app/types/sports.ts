// export type Sport = "football" | "basketball" | "hockey" | "handball" | "rugby";
export type Sport = "rugby";

export type Theme = {
  primary: string;
  hover: string;
  cross: string;
  crossHover: string;
  sportType: string;
};

export const sportThemes: Record<Sport, Theme> = {
  // football: {
  //   primary: "from-emerald-500 to-emerald-600",
  //   hover: "hover:from-emerald-600 hover:to-emerald-700",
  //   cross: "bg-red-500",
  //   crossHover: "hover:bg-red-600",
  //   sportType: "foot"
  // },
  // basketball: {
  //   primary: "from-orange-400 to-orange-700",
  //   hover: "hover:from-orange-700 hover:to-orange-800",
  //   cross: "bg-red-500",
  //   crossHover: "hover:bg-red-600",
  //   sportType: "basket"
  // },
  // hockey: {
  //   primary: "from-sky-400 to-sky-700",
  //   hover: "hover:from-sky-700 hover:to-sky-800",
  //   cross: "bg-red-500",
  //   crossHover: "hover:bg-red-600",
  //   sportType: "hockey"
  // },
  // handball: {
  //   primary: "from-sky-300 to-sky-400",
  //   hover: "hover:from-sky-400 hover:to-sky-500",
  //   cross: "bg-red-500",
  //   crossHover: "hover:bg-red-600",
  //   sportType: "handball"
  // },
  rugby: {
    primary: "from-emerald-600 to-emerald-700",
    hover: "hover:from-emerald-700 hover:to-emerald-800",
    cross: "bg-red-500",
    crossHover: "hover:bg-red-600",
    sportType: "rugby"
  }
};

export type Position = {
  id: string;
  name: string;
  order: number; // Ajout de l'ordre pour le tri
  translations?: {
    fr?: string; // Version française (optionnelle pour l'instant)
  };
};

export const sportPositions: Record<Sport, Position[]> = {
  // football: [
  //   { id: "goalkeeper", name: "Goalkeeper", order: 1, translations: { fr: "Gardien" } },
  //   { id: "defender3", name: "Left Back", order: 2, translations: { fr: "Arrière gauche" } },
  //   { id: "defender1", name: "Central Defender", order: 3, translations: { fr: "Défenseur central" } },
  //   { id: "defender2", name: "Central Defender", order: 4, translations: { fr: "Défenseur central" } },
  //   { id: "defender4", name: "Right Back", order: 5, translations: { fr: "Arrière droit" } },
  //   { id: "midfielder1", name: "Defensive Midfielder", order: 6, translations: { fr: "Milieu défensif" } },
  //   { id: "midfielder2", name: "Central Midfielder", order: 7, translations: { fr: "Milieu central" } },
  //   { id: "midfielder3", name: "Attacking Midfielder", order: 8, translations: { fr: "Milieu offensif" } },
  //   { id: "forward1", name: "Left Winger", order: 9, translations: { fr: "Ailier gauche" } },
  //   { id: "forward2", name: "Striker", order: 10, translations: { fr: "Attaquant" } },
  //   { id: "forward3", name: "Right Winger", order: 11, translations: { fr: "Ailier droit" } },
  //   { id: "football_substitute1", name: "Substitute 1", order: 12, translations: { fr: "Remplaçant 1" } },
  //   { id: "football_substitute2", name: "Substitute 2", order: 13, translations: { fr: "Remplaçant 2" } },
  //   { id: "football_substitute3", name: "Substitute 3", order: 14, translations: { fr: "Remplaçant 3" } },
  //   { id: "football_substitute4", name: "Substitute 4", order: 15, translations: { fr: "Remplaçant 4" } },
  //   { id: "football_substitute5", name: "Substitute 5", order: 16, translations: { fr: "Remplaçant 5" } },    
  // ],
  // basketball: [
  //   { id: "point", name: "Point Guard", order: 1, translations: { fr: "Meneur" } },
  //   { id: "shooting", name: "Shooting Guard", order: 2, translations: { fr: "Arrière" } },
  //   { id: "small", name: "Small Forward", order: 3, translations: { fr: "Ailier" } },
  //   { id: "power", name: "Power Forward", order: 4, translations: { fr: "Ailier fort" } },
  //   { id: "center", name: "Center", order: 5, translations: { fr: "Pivot" } },
  //   { id: "basketball_substitute1", name: "Substitute 1", order: 6, translations: { fr: "Remplaçant 1" } },
  //   { id: "basketball_substitute2", name: "Substitute 2", order: 7, translations: { fr: "Remplaçant 2" } },
  //   { id: "basketball_substitute3", name: "Substitute 3", order: 8, translations: { fr: "Remplaçant 3" } },
  //   { id: "basketball_substitute4", name: "Substitute 4", order: 9, translations: { fr: "Remplaçant 4" } },
  //   { id: "basketball_substitute5", name: "Substitute 5", order: 10, translations: { fr: "Remplaçant 5" } },
  // ],
  // hockey: [
  //   { id: "forward1", name: "Left Wing", order: 1, translations: { fr: "Ailier gauche" } },
  //   { id: "forward2", name: "Center", order: 2, translations: { fr: "Centre" } },
  //   { id: "forward3", name: "Right Wing", order: 3, translations: { fr: "Ailier droit" } },  
  //   { id: "forward4", name: "Left Wing", order: 4, translations: { fr: "Ailier gauche" } },
  //   { id: "forward5", name: "Center", order: 5, translations: { fr: "Centre" } },
  //   { id: "forward6", name: "Right Wing", order: 6, translations: { fr: "Ailier droit" } }, 
  //   { id: "forward7", name: "Left Wing", order: 7, translations: { fr: "Ailier gauche" } },
  //   { id: "forward8", name: "Center", order: 8, translations: { fr: "Centre" } },
  //   { id: "forward9", name: "Right Wing", order: 9, translations: { fr: "Ailier droit" } }, 
  //   { id: "forward10", name: "Left Wing", order: 10, translations: { fr: "Ailier gauche" } },
  //   { id: "forward11", name: "Center", order: 11, translations: { fr: "Centre" } },
  //   { id: "forward12", name: "Right Wing", order: 12, translations: { fr: "Ailier droit" } },  
  //   { id: "defense1", name: "Defenseman", order: 13, translations: { fr: "Défenseur" } },
  //   { id: "defense2", name: "Defenseman", order: 14, translations: { fr: "Défenseur" } },
  //   { id: "defense3", name: "Defenseman", order: 15, translations: { fr: "Défenseur" } },
  //   { id: "defense4", name: "Defenseman", or

// La fonction canPlayerBePlacedOnSlot et rugbyPositionSlotMapping ont été déplacées vers components/utils.ts der: 16, translations: { fr: "Défenseur" } },
  //   { id: "defense5", name: "Defenseman", order: 17, translations: { fr: "Défenseur" } },
  //   { id: "defense6", name: "Defenseman", order: 18, translations: { fr: "Défenseur" } },
  //   { id: "goalie1", name: "Goalie", order: 19, translations: { fr: "Gardien" } },
  //   { id: "goalie2", name: "Goalie", order: 20, translations: { fr: "Gardien" } },
  // ],
  // handball: [
  //   { id: "goalkeeper", name: "Left Wing", order: 1, translations: { fr: "Gardien" } },
  //   { id: "leftwing", name: "Left Wing", order: 2, translations: { fr: "Ailier gauche" } },
  //   { id: "leftback", name: "Left Back", order: 3, translations: { fr: "Arrière gauche" } },
  //   { id: "center", name: "Center Back", order: 4, translations: { fr: "Arrière centre" } },
  //   { id: "rightback", name: "Right Back", order: 5, translations: { fr: "Arrière droit" } },
  //   { id: "right_wing", name: "Right Wing", order: 6, translations: { fr: "Ailier droit" } },
  //   { id: "pivot", name: "Pivot", order: 7, translations: { fr: "Pivot" } },
  //   { id: "defense", name: "Defender", order: 8, translations: { fr: "Défenseur" } },
  //   { id: "handball_substitute1", name: "Goalkeeper 2", order: 9, translations: { fr: "Gardien 2" } },    
  //   { id: "handball_substitute2", name: "Left Wing 2", order: 10, translations: { fr: "Ailier gauche 2" } },
  //   { id: "handball_substitute3", name: "Center Back 2", order: 11, translations: { fr: "Arrière centre 2" } },
  //   { id: "handball_substitute4", name: "Right Back 2", order: 12, translations: { fr: "Arrière droit 2" } },
  //   { id: "handball_substitute5", name: "Right Wing 2", order: 13, translations: { fr: "Ailier droit 2" } },
  //   { id: "handball_substitute6", name: "Pivot 2", order: 14, translations: { fr: "Pivot 2" } },
  // ],
  rugby: [
    { id: "fullback", name: "15 - Fullback", order: 15, translations: { fr: "15 - Arrière" } },
    { id: "wing1", name: "14 - Wing", order: 14, translations: { fr: "14 - Ailier" } },
    { id: "center1", name: "13 - Center", order: 12, translations: { fr: "13 - Centre" } },
    { id: "center2", name: "12 - Center", order: 11, translations: { fr: "12 - Centre" } },
    { id: "wing2", name: "11 - Wing", order: 13, translations: { fr: "11 - Ailier" } },
    { id: "flyhalf", name: "10 - Fly-half", order: 10, translations: { fr: "10 - Demi d'ouverture" } },
    { id: "scrumhalf", name: "9 - Scrum-half", order: 9, translations: { fr: "9 - Demi de mêlée" } },
    { id: "number8", name: "8 - Number 8", order: 8, translations: { fr: "8 - Numéro 8" } },
    { id: "flanker1", name: "7 - Flanker", order: 7, translations: { fr: "7 - Troisième ligne aile" } },
    { id: "flanker2", name: "6 - Flanker", order: 6, translations: { fr: "6 - Troisième ligne aile" } },
    { id: "lock1", name: "5 - Lock", order: 5, translations: { fr: "5 - Deuxième ligne" } },
    { id: "lock2", name: "4 - Lock", order: 4, translations: { fr: "4 - Deuxième ligne" } },
    { id: "prop1", name: "3 - Prop", order: 3, translations: { fr: "3 - Pilier" } },
    { id: "hooker", name: "2 - Hooker", order: 2, translations: { fr: "2 - Talonneur" } },
    { id: "prop2", name: "1 - Prop", order: 1, translations: { fr: "1 - Pilier" } },
    { id: "rugby_substitute1", name: "16 - Prop", order: 16, translations: { fr: "16 - Pilier" } },
    { id: "rugby_substitute2", name: "17 - Prop", order: 17, translations: { fr: "17 - Pilier" } },
    { id: "rugby_substitute3", name: "18 - Hooker", order: 18, translations: { fr: "18 - Talonneur" } },
    { id: "rugby_substitute4", name: "19 - Lock", order: 19, translations: { fr: "19 - Deuxième ligne" } },
    { id: "rugby_substitute5", name: "20 - Back Row", order: 20, translations: { fr: "20 - Troisième ligne" } },
    { id: "rugby_substitute6", name: "21 - Scrum-half", order: 21, translations: { fr: "21 - Demi de mêlée" } },
    { id: "rugby_substitute7", name: "22 - Back", order: 22, translations: { fr: "22 - Demi d'ouverture" } },
    { id: "rugby_substitute8", name: "23 - Back", order: 23, translations: { fr: "23 - Arrière" } },    
  ]
};