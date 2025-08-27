import { TeamSelectorProps } from "../types/teamSelectorProps";

export const TeamSelector = ({ selectedTeam, onSelectTeam, players, selectedSport }: TeamSelectorProps) => {
  
  // Fonction pour extraire le pays à partir du chemin de l'image
  const extractCountryFromPath = (imagePath: string): string => {
    const pathParts = imagePath.split('/');
    // Le pays est généralement dans la structure: images/sport/teams/COUNTRY/team.webp
    const countryIndex = pathParts.findIndex(part => part === 'teams') + 1;
    return pathParts[countryIndex] || 'Unknown';
  };

  // Créer un mapping équipe -> pays basé sur les logos des équipes
  const teamToCountryMap = new Map<string, string>();
  
  // Récupérer toutes les équipes uniques et leurs pays
  const allTeams = new Set<string>();
  players
    .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
    .forEach(player => {
      [player.team1, player.team2, player.team3, player.actual_team].forEach(team => {
        if (team) {
          allTeams.add(team);
          // Essayer de déterminer le pays à partir des logos
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
    // Trier d'abord par pays, puis par nom d'équipe
    const countryA = teamToCountryMap.get(a) || 'Unknown';
    const countryB = teamToCountryMap.get(b) || 'Unknown';
    
    if (countryA !== countryB) {
      return countryA.localeCompare(countryB);
    }
    
    return a.localeCompare(b);
  });

  // Grouper les équipes par pays
  const teamsByCountry = new Map<string, string[]>();
  teams.forEach(team => {
    const country = teamToCountryMap.get(team) || 'Unknown';
    if (!teamsByCountry.has(country)) {
      teamsByCountry.set(country, []);
    }
    teamsByCountry.get(country)!.push(team);
  });

  // Fonction pour obtenir le nom complet du pays à partir du code
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

  return (
    <div>
        <select
            aria-label="Choose a team"
            value={selectedTeam}
            onChange={(e) => onSelectTeam(e.target.value)}
            className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
            <option value="">All teams</option>
            {Array.from(teamsByCountry.entries()).map(([countryCode, countryTeams]) => (
              <optgroup key={countryCode} label={getCountryName(countryCode)}>
                {countryTeams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
    </div>
  )
}
