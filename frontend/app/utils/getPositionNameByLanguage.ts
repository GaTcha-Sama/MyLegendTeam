import { Position } from "../types/sports";

export const getPositionNameByLanguage = (position: Position, language: 'en' | 'fr' = 'en'): string => {
    if (language === 'fr' && position.translations?.fr) {
      return position.translations.fr;
    }
    return position.name;
  }; 