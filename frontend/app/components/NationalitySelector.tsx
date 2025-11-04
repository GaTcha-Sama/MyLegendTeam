import { NationalitySelectorProps } from "../types/nationalitySelectorProps";
import { nationalityGroupsRugby } from "../types/nationalityGroups";

export const NationalitySelector = ({ selectedNationality, onSelectNationality, players, selectedSport }: NationalitySelectorProps) => {
  
  const nationalities = Array.from(
    new Set(
      players
        .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
        .map(player => player.nationality1)
        .concat(players
          .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
          .map(player => player.nationality2)
        )
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
        className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)]"
      >
        <option value="">All {selectedSport} nationalities</option>
        
        {selectedSport.toLowerCase() === 'rugby' && Object.keys(nationalityGroupsRugby).map((groupName) => (
          <option 
            key={groupName} 
            value={groupName}
            style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}
          >
            {groupName}
          </option>
        ))}

        {selectedSport.toLowerCase() === 'rugby' && (
          <option key="separator" disabled style={{ fontStyle: 'italic', color: '#666' }}>
            ────────────────
          </option>
        )}
        
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
