import { TeamSelectorProps } from "../types/teamSelectorProps";

export const TeamSelector = ({ selectedTeam, onSelectTeam, players, selectedSport }: TeamSelectorProps) => {
  
  const extractCountryFromPath = (imagePath: string): string => {
    const pathParts = imagePath.split('/');
    const countryIndex = pathParts.findIndex(part => part === 'teams') + 1;
    return pathParts[countryIndex] || 'Unknown';
  };

  const teamToCountryMap = new Map<string, string>();
  
  const allTeams = new Set<string>();
  players
    .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
    .forEach(player => {
      [player.team1, player.team2, player.team3, player.actual_team].forEach(team => {
        if (team) {
          allTeams.add(team);
          if (player.actual_team_logo && player.actual_team === team) {
            teamToCountryMap.set(team, extractCountryFromPath(player.actual_team_logo));
          } else if (player.team1_logo && player.team1 === team) {
            teamToCountryMap.set(team, extractCountryFromPath(player.team1_logo));
          } else if (player.team2_logo && player.team2 === team) {
            teamToCountryMap.set(team, extractCountryFromPath(player.team2_logo));
          } else if (player.team3_logo && player.team3 === team) {
            teamToCountryMap.set(team, extractCountryFromPath(player.team3_logo));
          }
        }
      });
    });

  const teams = Array.from(allTeams).sort((a, b) => {
    const countryA = teamToCountryMap.get(a) || 'Unknown';
    const countryB = teamToCountryMap.get(b) || 'Unknown';
    
    if (countryA !== countryB) {
      return countryA.localeCompare(countryB);
    }
    
    return a.localeCompare(b);
  });

  const teamsByCountry = new Map<string, string[]>();
  teams.forEach(team => {
    const country = teamToCountryMap.get(team) || 'Unknown';
    if (!teamsByCountry.has(country)) {
      teamsByCountry.set(country, []);
    }
    teamsByCountry.get(country)!.push(team);
  });

  const getCountryName = (countryCode: string): string => {
    const countryNames: { [key: string]: string } = {
      'FRA': 'France',
      'NZL': 'New Zealand',
      'AUS': 'Australia',
      'RSA': 'South Africa',
      'IRL': 'Ireland',
      'ENG': 'England',
      'JAP': 'Japan',
      'USA': 'United States',
      'GEO': 'Georgia',
      'ARG': 'Argentina',
      'ITA': 'Italy',
      'SCO': 'Scotland',
      'WAL': 'Wales',
      'FJI': 'Fiji',
      'SAM': 'Samoa',
      'TON': 'Tonga',
      'Unknown': 'Other'
    };
    return countryNames[countryCode] || countryCode;
  };

  const selectedTeams = Array.isArray(selectedTeam) ? selectedTeam : selectedTeam ? [selectedTeam] : [];

  const handleTeamToggle = (team: string) => {
    const newSelection = selectedTeams.includes(team)
      ? selectedTeams.filter(t => t !== team)
      : [...selectedTeams, team];
    onSelectTeam(newSelection);
  };

  const getDisplayText = () => {
    if (selectedTeams.length === 0) return "All teams";
    if (selectedTeams.length === 1) return selectedTeams[0];
    if (selectedTeams.length === 2) return selectedTeams.join(", ");
    return `${selectedTeams.length} teams selected`;
  };

  return (
    <div>
      <select
        aria-label="Choose teams"
        value=""
        onChange={(e) => {
          if (e.target.value) {
            handleTeamToggle(e.target.value);
          }
        }}
        className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">{getDisplayText()}</option>
        {Array.from(teamsByCountry.entries()).map(([countryCode, countryTeams]) => (
          <optgroup key={countryCode} label={getCountryName(countryCode)}>
            {countryTeams.map((team) => (
              <option 
                key={team} 
                value={team}
                className={selectedTeams.includes(team) ? "bg-blue-200 text-blue-800" : "bg-gray-100 text-gray-700"}
                style={{
                  backgroundColor: selectedTeams.includes(team) ? '#dbeafe' : 'transparent',
                  color: selectedTeams.includes(team) ? '#1e40af' : '#374151',
                  fontWeight: selectedTeams.includes(team) ? 'bold' : 'normal'
                }}
              >
                {selectedTeams.includes(team) ? `✓ ${team}` : team}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
