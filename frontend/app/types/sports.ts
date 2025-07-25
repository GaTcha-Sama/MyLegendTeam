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
};

export const sportPositions: Record<Sport, Position[]> = {
  // football: [
  //   { id: "goalkeeper", name: "Goalkeeper" },
  //   { id: "defender3", name: "Left Back" },
  //   { id: "defender1", name: "Central Defender" },
  //   { id: "defender2", name: "Central Defender" },
  //   { id: "defender4", name: "Right Back" },
  //   { id: "midfielder1", name: "Defensive Midfielder" },
  //   { id: "midfielder2", name: "Central Midfielder" },
  //   { id: "midfielder3", name: "Attacking Midfielder" },
  //   { id: "forward1", name: "Left Winger" },
  //   { id: "forward2", name: "Striker" },
  //   { id: "forward3", name: "Right Winger" },
  //   { id: "football_substitute1", name: "Substitute 1" },
  //   { id: "football_substitute2", name: "Substitute 2" },
  //   { id: "football_substitute3", name: "Substitute 3" },
  //   { id: "football_substitute4", name: "Substitute 4" },
  //   { id: "football_substitute5", name: "Substitute 5" },    
  // ],
  // basketball: [
  //   { id: "point", name: "Point Guard" },
  //   { id: "shooting", name: "Shooting Guard" },
  //   { id: "small", name: "Small Forward" },
  //   { id: "power", name: "Power Forward" },
  //   { id: "center", name: "Center" },
  //   { id: "basketball_substitute1", name: "Substitute 1" },
  //   { id: "basketball_substitute2", name: "Substitute 2" },
  //   { id: "basketball_substitute3", name: "Substitute 3" },
  //   { id: "basketball_substitute4", name: "Substitute 4" },
  //   { id: "basketball_substitute5", name: "Substitute 5" },
  // ],
  // hockey: [
  //   { id: "forward1", name: "Left Wing" },
  //   { id: "forward2", name: "Center" },
  //   { id: "forward3", name: "Right Wing" },  
  //   { id: "forward4", name: "Left Wing" },
  //   { id: "forward5", name: "Center" },
  //   { id: "forward6", name: "Right Wing" }, 
  //   { id: "forward7", name: "Left Wing" },
  //   { id: "forward8", name: "Center" },
  //   { id: "forward9", name: "Right Wing" }, 
  //   { id: "forward10", name: "Left Wing" },
  //   { id: "forward11", name: "Center" },
  //   { id: "forward12", name: "Right Wing" },  
  //   { id: "defense1", name: "Defenseman" },
  //   { id: "defense2", name: "Defenseman" },
  //   { id: "defense3", name: "Defenseman" },
  //   { id: "defense4", name: "Defenseman" },
  //   { id: "defense5", name: "Defenseman" },
  //   { id: "defense6", name: "Defenseman" },
  //   { id: "goalie1", name: "Goalie" },
  //   { id: "goalie2", name: "Goalie" },
  // ],
  // handball: [
  //   { id: "goalkeeper", name: "Goalkeeper" },
  //   { id: "leftwing", name: "Left Wing" },
  //   { id: "leftback", name: "Left Back" },
  //   { id: "center", name: "Center Back" },
  //   { id: "rightback", name: "Right Back" },
  //   { id: "right_wing", name: "Right Wing" },
  //   { id: "pivot", name: "Pivot" },
  //   { id: "defense", name: "Defender"},
  //   { id: "handball_substitute1", name: "Goalkeeper 2" },    
  //   { id: "handball_substitute2", name: "Left Wing 2" },
  //   { id: "handball_substitute3", name: "Center Back 2" },
  //   { id: "handball_substitute4", name: "Right Back 2" },
  //   { id: "handball_substitute5", name: "Right Wing 2" },
  //   { id: "handball_substitute6", name: "Pivot 2" },
  // ],
  rugby: [
    { id: "fullback", name: "15 / Fullback" },
    { id: "wing1", name: "14 / Wing" },
    { id: "center1", name: "13 / Center" },
    { id: "center2", name: "12 / Center" },
    { id: "wing2", name: "11 / Wing" },
    { id: "flyhalf", name: "10 / Fly-half" },
    { id: "scrumhalf", name: "9 / Scrum-half" },
    { id: "number8", name: "8 / Number 8" },
    { id: "flanker1", name: "7 / Flanker" },
    { id: "flanker2", name: "6 / Flanker" },
    { id: "lock1", name: "5 / Lock" },
    { id: "lock2", name: "4 / Lock" },
    { id: "prop1", name: "3 / Prop" },
    { id: "hooker", name: "2 / Hooker" },
    { id: "prop2", name: "1 / Prop" },
    { id: "rugby_substitute1", name: "16 / Prop" },
    { id: "rugby_substitute2", name: "17 / Prop" },
    { id: "rugby_substitute3", name: "18 / Hooker" },
    { id: "rugby_substitute4", name: "19 / Lock" },
    { id: "rugby_substitute5", name: "20 / Back Row" },
    { id: "rugby_substitute6", name: "21 / Scrum-half" },
    { id: "rugby_substitute7", name: "22 / Fly-half" },
    { id: "rugby_substitute8", name: "23 / Back" },    
  ]
}; 