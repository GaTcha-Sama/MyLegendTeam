import { Player } from "../data/players";

interface NationalitySelectorProps { 
  selectedNationality: string;
  onSelectNationality: (nationality: string) => void;
  players: Player[];
}

export const NationalitySelector = ({ selectedNationality, onSelectNationality, players }: NationalitySelectorProps) => {
  // Extraire les nationalités uniques des joueurs
  const nationalities = Array.from(new Set(players.map(player => player.nationality))).sort();

  return (
    <div>
        <select
            aria-label="Sélectionner une nationalité"
            value={selectedNationality}
            onChange={(e) => onSelectNationality(e.target.value)}
            className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
            <option value="">Toutes les nationalités</option>
            {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                    {nationality}
                </option>
            ))}
        </select>
    </div>
  )
}
