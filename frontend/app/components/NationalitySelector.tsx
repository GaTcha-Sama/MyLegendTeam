import { NationalitySelectorProps } from "../types/nationalitySelectorProps";
import { nationalityGroups } from "../types/nationalityGroups";

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
        
        {/* Groupes de nationalités spéciaux */}
        {Object.keys(nationalityGroups).map((groupName) => (
          <option 
            key={groupName} 
            value={groupName}
            style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}
          >
            {groupName}
          </option>
        ))}
        
        {/* Séparateur visuel */}
        <option disabled style={{ fontStyle: 'italic', color: '#666' }}>
          ────────────────
        </option>
        
        {/* Nationalités individuelles */}
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
