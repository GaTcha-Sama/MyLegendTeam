export type Sport = "football" | "basketball" | "hockey" | "handball" | "rugby";

export type Theme = {
  primary: string;
  hover: string;
  accent: string;
  accentHover: string;
};

export const sportThemes: Record<Sport, Theme> = {
  football: {
    primary: "from-green-600 to-green-700",
    hover: "hover:from-green-700 hover:to-green-800",
    accent: "bg-green-500",
    accentHover: "hover:bg-green-600"
  },
  basketball: {
    primary: "from-orange-600 to-orange-700",
    hover: "hover:from-orange-700 hover:to-orange-800",
    accent: "bg-orange-500",
    accentHover: "hover:bg-orange-600"
  },
  hockey: {
    primary: "from-blue-600 to-blue-700",
    hover: "hover:from-blue-700 hover:to-blue-800",
    accent: "bg-blue-500",
    accentHover: "hover:bg-blue-600"
  },
  handball: {
    primary: "from-purple-600 to-purple-700",
    hover: "hover:from-purple-700 hover:to-purple-800",
    accent: "bg-purple-500",
    accentHover: "hover:bg-purple-600"
  },
  rugby: {
    primary: "from-red-600 to-red-700",
    hover: "hover:from-red-700 hover:to-red-800",
    accent: "bg-red-500",
    accentHover: "hover:bg-red-600"
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
    { id: "forward3", name: "Ailier Droit" }
  ],
  basketball: [
    { id: "point", name: "Meneur" },
    { id: "shooting", name: "Arrière" },
    { id: "small", name: "Ailier" },
    { id: "power", name: "Ailier Fort" },
    { id: "center", name: "Pivot" }
  ],
  hockey: [
    { id: "goalie", name: "Gardien" },
    { id: "defense1", name: "Défenseur" },
    { id: "defense2", name: "Défenseur" },
    { id: "forward1", name: "Ailier gauche" },
    { id: "forward2", name: "Centre" },
    { id: "forward3", name: "Ailier droit" }
  ],
  handball: [
    { id: "goalkeeper", name: "Gardien" },
    { id: "left_wing", name: "Ailier Gauche" },
    { id: "left_back", name: "Arrière Gauche" },
    { id: "center", name: "Demi-Centre" },
    { id: "right_back", name: "Arrière Droit" },
    { id: "right_wing", name: "Ailier Droit" },
    { id: "pivot", name: "Pivot" },
    { id: "defense", name: "Défenseur"}
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
    { id: "prop1", name: "3 / Pilier gauche" },
    { id: "hooker", name: "2 / Talonneur" },
    { id: "prop2", name: "1 / Pilier droit" }
  ]
}; 