import { NationalitySelectorProps } from "../types/nationalitySelectorProps";

export const NationalitySelector = ({ selectedNationality, onSelectNationality, players, selectedSport }: NationalitySelectorProps) => {
  
  const nationalities = Array.from(
    new Set(
      players
        .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
        .map(player => player.nationality)
    )
  ).sort();

  // Convertir selectedNationality en tableau si ce n'est pas déjà le cas
  const selectedNationalities = Array.isArray(selectedNationality) ? selectedNationality : selectedNationality ? [selectedNationality] : [];

  const handleNationalityToggle = (nationality: string) => {
    const newSelection = selectedNationalities.includes(nationality)
      ? selectedNationalities.filter(n => n !== nationality)
      : [...selectedNationalities, nationality];
    onSelectNationality(newSelection);
  };

  const getDisplayText = () => {
    if (selectedNationalities.length === 0) return "All nationalities";
    if (selectedNationalities.length === 1) return selectedNationalities[0];
    if (selectedNationalities.length === 2) return selectedNationalities.join(", ");
    return `${selectedNationalities.length} nationalities selected`;
  };

  return (
    <div>
      <select
        aria-label="Choose nationalities"
        value=""
        onChange={(e) => {
          if (e.target.value) {
            handleNationalityToggle(e.target.value);
          }
        }}
        className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">{getDisplayText()}</option>
        {nationalities.map((nationality) => (
          <option 
            key={nationality} 
            value={nationality}
            className={selectedNationalities.includes(nationality) ? "bg-blue-200 text-blue-800" : "bg-gray-100 text-gray-700"}
            style={{
              backgroundColor: selectedNationalities.includes(nationality) ? '#dbeafe' : 'transparent',
              color: selectedNationalities.includes(nationality) ? '#1e40af' : '#374151',
              fontWeight: selectedNationalities.includes(nationality) ? 'bold' : 'normal'
            }}
          >
            {selectedNationalities.includes(nationality) ? `✓ ${nationality}` : nationality}
          </option>
        ))}
      </select>
    </div>
  );
};
