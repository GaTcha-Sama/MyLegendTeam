import { Sport, sportThemes } from "../types/sports";

interface SportSelectorProps {
  selectedSport: Sport;
  onSelectSport: (sport: Sport) => void;
}

export const SportSelector = ({ selectedSport, onSelectSport }: SportSelectorProps) => {
  return (
    <select
      aria-label="Sélectionner un sport"
      value={selectedSport}
      onChange={(e) => onSelectSport(e.target.value as Sport)}
      className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
    >
      {Object.keys(sportThemes).map((sport) => (
        <option key={sport} value={sport}>
          {sport === 'football' ? 'Football' : 
           sport === 'basketball' ? 'Basketball' : 
           sport === 'handball' ? 'Handball' : 
           sport === 'hockey' ? 'Hockey' : 'Rugby'}
        </option>
      ))}
    </select>
  );
}; 