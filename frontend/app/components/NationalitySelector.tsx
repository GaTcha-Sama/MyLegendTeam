import { NationalitySelectorProps } from "../types/nationalitySelectorProps";

export const NationalitySelector = ({ selectedNationality, onSelectNationality, players, selectedSport }: NationalitySelectorProps) => {
  
  const nationalities = Array.from(
    new Set(
      players
        .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
        .map(player => player.nationality)
    )
  ).sort();

  const handleNationalityChange = (nationality: string) => {
    onSelectNationality(nationality);
  };

  return (
    <div>
      <select
        aria-label="Choose nationality"
        value={selectedNationality || ""}
        onChange={(e) => handleNationalityChange(e.target.value)}
        className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">All nationalities</option>
        {nationalities.map((nationality) => (
          <option 
            key={nationality} 
            value={nationality}
          >
            {nationality}
          </option>
        ))}
      </select>
    </div>
  );
};
