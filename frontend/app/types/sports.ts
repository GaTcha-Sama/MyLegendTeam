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