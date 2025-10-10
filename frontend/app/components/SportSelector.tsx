import { Sport } from "../types/sports";
import { SportSelectorProps } from "../types/sportSelectorProps";

export const SportSelector = ({ selectedSport, onSelectSport }: SportSelectorProps) => {
  // Utiliser tous les sports définis dans le type Sport au lieu de se baser sur les joueurs chargés
  const availableSports: Sport[] = ["rugby", "basketball"];

  return (
    <select
      aria-label="Sélectionner un sport"
      value={selectedSport}
      onChange={(e) => onSelectSport(e.target.value as Sport)}
      className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)]"
    >
      {availableSports.map((sport) => (
        <option key={sport} value={sport}>
          {sport.charAt(0).toUpperCase() + sport.slice(1)}
        </option>
      ))}
    </select>
  );
}; 