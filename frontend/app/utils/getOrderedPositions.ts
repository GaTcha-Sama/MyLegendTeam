import { Sport, Position, sportPositions } from "../types/sports";
import { getPositionNameByLanguage } from "./getPositionNameByLanguage";

export const getOrderedPositions = (
  sport: Sport,
  language: "en" | "fr" = "en"
): Position[] => {
  const positions = sportPositions[sport];
  if (!positions) return [];

  return [...positions]
    .sort((a, b) => a.order - b.order)
    .map((position) => ({
      ...position,
      name: getPositionNameByLanguage(position, language),
    }));
};

