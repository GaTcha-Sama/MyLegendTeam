import { Player } from "../types/players";

interface TeamSelectorProps {
  selectedTeam: string;
  onSelectTeam: (team: string) => void;
  players: Player[];
  selectedSport: string;
}
export const TeamSelector = ({ selectedTeam, onSelectTeam, players, selectedSport }: TeamSelectorProps) => {
  
  const teams = Array.from(
    new Set(
      players
        .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
        .flatMap(player => [player.team1, player.team2, player.team3].filter(Boolean))
    )
  ).sort();
  return (
    <div>
        <select
            aria-label="Choose a team"
            value={selectedTeam}
            onChange={(e) => onSelectTeam(e.target.value)}
            className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
            <option value="">All teams</option>
            {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
            ))}
        </select>
    </div>
  )
}
