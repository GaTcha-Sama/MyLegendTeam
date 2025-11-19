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
        .filter(nationality => nationality && nationality.trim() !== "")
    )
  ).sort();

  const handleNationalityChange = (nationality: string) => {
    onSelectNationality(nationality);
  };

  const resetNationality = () => {
    onSelectNationality("");
  };

  return (
    <div className="relative">
      <select
        aria-label="Choose nationality"
        value={selectedNationality || ""}
        onChange={(e) => handleNationalityChange(e.target.value)}
        className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)] pr-10"
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
      {selectedNationality && selectedNationality !== "" && (
        <button
          onClick={resetNationality}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-red-100"
          aria-label="Clear nationality"
          style={{ top: 'calc(50% - 8px)' }}
        >
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
};
