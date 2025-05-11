import { Player } from "../data/players";

interface PositionSelectorProps {
  selectedPosition: string;
  onSelectPosition: (position: string) => void;
  players: Player[];
  selectedSport: string;
}

export const PositionSelector = ({ selectedPosition, onSelectPosition, players, selectedSport }: PositionSelectorProps) => {
  const positions = Array.from(
    new Set(
      players
        .filter(player => player.sport.toLowerCase() === selectedSport.toLowerCase())
        .map(player => player.position)
    )
  ).sort();
  return (
    <div>
      <select
        aria-label="Choose a position"
        value={selectedPosition}
        onChange={(e) => onSelectPosition(e.target.value)}
        className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">All {selectedSport} positions</option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>
    </div>
  );
};
