import { Sport } from "../types/sports";
import { SportSelectorProps } from "../types/sportSelectorProps";

export const SportSelector = ({ selectedSport, onSelectSport, players }: SportSelectorProps) => {
  const availableSports = Array.from(new Set(players.map(player => player.sport.toLowerCase()))).sort();

  return (
    <select
      aria-label="Sélectionner un sport"
      value={selectedSport}
      onChange={(e) => onSelectSport(e.target.value as Sport)}
      className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
    >
      {availableSports.map((sport) => (
        <option key={sport} value={sport}>
          {sport.charAt(0).toUpperCase() + sport.slice(1)}
        </option>
      ))}
    </select>
  );
}; 