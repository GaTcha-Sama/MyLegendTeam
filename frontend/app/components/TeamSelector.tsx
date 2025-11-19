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
      'ESP': 'Spain',
      'POR': 'Portugal',
      'GER': 'Germany',
      'NED': 'Netherlands',
      'BEL': 'Belgium',
      'SUI': 'Switzerland',
      'AUT': 'Austria',
      'SWE': 'Sweden',
      'NOR': 'Norway',
      'BRA': 'Brazil',
      'CHN': 'China',
      'IND': 'India',
      'JPN': 'Japan',
      'KOR': 'South Korea',
      'MEX': 'Mexico',
      'CAN': 'Canada',
      'Unknown': 'Other'
    };
    return countryNames[countryCode] || countryCode;
  };

  const handleTeamChange = (team: string) => {
    onSelectTeam(team);
  };

  const resetTeam = () => {
    onSelectTeam("");
  };

  return (
    <div className="relative">
      <select
        aria-label="Choose team"
        value={selectedTeam || ""}
        onChange={(e) => handleTeamChange(e.target.value)}
        className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)] pr-10"
      >
        <option value="">All {selectedSport} teams</option>
        {Array.from(teamsByCountry.entries()).map(([countryCode, countryTeams]) => (
          <optgroup key={countryCode} label={getCountryName(countryCode)}>
            {countryTeams.map((team) => (
              <option 
                key={team} 
                value={team}
              >
                {team}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {selectedTeam && selectedTeam !== "" && (
        <button
          onClick={resetTeam}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-red-100"
          aria-label="Clear team"
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
