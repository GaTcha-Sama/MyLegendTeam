import { Sport, sportThemes } from "../types/sports";

interface SportSelectorProps {
  selectedSport: Sport;
  onSelectSport: (sport: Sport) => void;
}

export const SportSelector = ({ selectedSport, onSelectSport }: SportSelectorProps) => {
  return (
    <div className="flex gap-4 mb-6">
      {Object.keys(sportThemes).map((sport) => (
        <button
          key={sport}
          onClick={() => onSelectSport(sport as Sport)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200
            ${selectedSport === sport 
              ? `${sportThemes[sport as Sport].primary} text-white` 
              : 'bg-gray-100 cursor-pointer text-gray-700 hover:bg-gray-200'}`}
        >
          {sport === 'football' ? 'Football' : 
           sport === 'basketball' ? 'Basketball' : 
           sport === 'handball' ? 'Handball' : 
           sport === 'hockey' ? 'Hockey' : 'Rugby'}
        </button>
      ))}
    </div>
  );
}; 