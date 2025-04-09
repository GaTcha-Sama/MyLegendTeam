export type Sport = "football" | "basketball" | "hockey" | "handball" | "rugby";

export type Theme = {
  primary: string;
  hover: string;
  accent: string;
  accentHover: string;
  sportType: string;
};

export const sportThemes: Record<Sport, Theme> = {
  football: {
    primary: "from-green-600 to-green-700",
    hover: "hover:from-green-700 hover:to-green-800",
    accent: "bg-green-500",
    accentHover: "hover:bg-green-600",
    sportType: "foot"
  },
  basketball: {
    primary: "from-orange-600 to-orange-700",
    hover: "hover:from-orange-700 hover:to-orange-800",
    accent: "bg-orange-500",
    accentHover: "hover:bg-orange-600",
    sportType: "basket"
  },
  hockey: {
    primary: "from-blue-600 to-blue-700",
    hover: "hover:from-blue-700 hover:to-blue-800",
    accent: "bg-blue-500",
    accentHover: "hover:bg-blue-600",
    sportType: "hockey"
  },
  handball: {
    primary: "from-purple-600 to-purple-700",
    hover: "hover:from-purple-700 hover:to-purple-800",
    accent: "bg-purple-500",
    accentHover: "hover:bg-purple-600",
    sportType: "handball"
  },
  rugby: {
    primary: "from-red-600 to-red-700",
    hover: "hover:from-red-700 hover:to-red-800",
    accent: "bg-red-500",
    accentHover: "hover:bg-red-600",
    sportType: "rugby"
  }
};

export type Position = {
  id: string;
  name: string;
};

export const sportPositions: Record<Sport, Position[]> = {
  football: [
    { id: "goalkeeper", name: "Gardien" },
    { id: "defender3", name: "Latéral Gauche" },
    { id: "defender1", name: "Défenseur Central" },
    { id: "defender2", name: "Défenseur Central" },
    { id: "defender4", name: "Latéral Droit" },
    { id: "midfielder1", name: "Milieu Défensif" },
    { id: "midfielder2", name: "Milieu Central" },
    { id: "midfielder3", name: "Milieu Offensif" },
    { id: "forward1", name: "Ailier Gauche" },
    { id: "forward2", name: "Attaquant" },
    { id: "forward3", name: "Ailier Droit" },
    { id: "substitute1", name: "Remplaçant 1" },
    { id: "substitute2", name: "Remplaçant 2" },
    { id: "substitute3", name: "Remplaçant 3" },
    { id: "substitute4", name: "Remplaçant 4" },
    { id: "substitute5", name: "Remplaçant 5" },    
  ],
  basketball: [
    { id: "point", name: "Meneur" },
    { id: "shooting", name: "Arrière" },
    { id: "small", name: "Ailier" },
    { id: "power", name: "Ailier Fort" },
    { id: "center", name: "Pivot" },
    { id: "substitute1", name: "Remplaçant 1" },
    { id: "substitute2", name: "Remplaçant 2" },
    { id: "substitute3", name: "Remplaçant 3" },
    { id: "substitute4", name: "Remplaçant 4" },
    { id: "substitute5", name: "Remplaçant 5" },
    
  ],
  hockey: [
    { id: "forward1", name: "Ailier gauche" },
    { id: "forward2", name: "Centre" },
    { id: "forward3", name: "Ailier droit" },  
    { id: "forward4", name: "Ailier gauche" },
    { id: "forward5", name: "Centre" },
    { id: "forward6", name: "Ailier droit" }, 
    { id: "forward7", name: "Ailier gauche" },
    { id: "forward8", name: "Centre" },
    { id: "forward9", name: "Ailier droit" }, 
    { id: "forward10", name: "Ailier gauche" },
    { id: "forward11", name: "Centre" },
    { id: "forward12", name: "Ailier droit" },  
    { id: "defense1", name: "Défenseur" },
    { id: "defense2", name: "Défenseur" },
    { id: "defense3", name: "Défenseur" },
    { id: "defense4", name: "Défenseur" },
    { id: "defense5", name: "Défenseur" },
    { id: "defense6", name: "Défenseur" },
    { id: "goalie1", name: "Gardien" },
    { id: "goalie2", name: "Gardien" },
  ],
  handball: [
    { id: "goalkeeper", name: "Gardien" },
    { id: "left_wing", name: "Ailier Gauche" },
    { id: "left_back", name: "Arrière Gauche" },
    { id: "center", name: "Demi-Centre" },
    { id: "right_back", name: "Arrière Droit" },
    { id: "right_wing", name: "Ailier Droit" },
    { id: "pivot", name: "Pivot" },
    { id: "defense", name: "Défenseur"},
    { id: "substitute1", name: "Gardien 2" },    
    { id: "substitute2", name: "Remplaçant 1" },
    { id: "substitute3", name: "Remplaçant 2" },
    { id: "substitute4", name: "Remplaçant 3" },
    { id: "substitute5", name: "Remplaçant 4" },
    { id: "substitute6", name: "Remplaçant 5" },
  ],
  rugby: [
    // 15 positions du rugby à XV
    { id: "fullback", name: "15 / Arrière" },
    { id: "wing1", name: "14 / Ailier" },
    { id: "center1", name: "13 / Centre" },
    { id: "center2", name: "12 / Centre" },
    { id: "wing2", name: "11 / Ailier" },
    { id: "flyhalf", name: "10 / Demi d'ouverture" },
    { id: "scrumhalf", name: "9 / Demi de mêlée" },
    { id: "number8", name: "8 / Numéro 8" },
    { id: "flanker1", name: "7 / Flanker" },
    { id: "flanker2", name: "6 / Flanker" },
    { id: "lock1", name: "5 / Deuxième ligne" },
    { id: "lock2", name: "4 / Deuxième ligne" },
    { id: "prop1", name: "3 / Pilier droit" },
    { id: "hooker", name: "2 / Talonneur" },
    { id: "prop2", name: "1 / Pilier gauche" },
    { id: "substitute1", name: "16 / Pilier gauche" },
    { id: "substitute2", name: "17 / Pilier droit" },
    { id: "substitute3", name: "18 / Talonneur" },
    { id: "substitute4", name: "19 / Deuxième ligne" },
    { id: "substitute5", name: "20 / Troisième ligne" },
    { id: "substitute6", name: "21 / Demi de mêlée" },
    { id: "substitute7", name: "22 / Demi d'ouverture" },
    { id: "substitute8", name: "23 / Trois quarts" },    
  ]
}; 