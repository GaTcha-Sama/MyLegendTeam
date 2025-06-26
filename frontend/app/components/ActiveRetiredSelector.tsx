import { Player } from "../types/players";

interface ActiveRetiredSelectorProps {
  selectedActiveRetired: number | null;
  onSelectActiveRetired: (activeRetired: number | null) => void;
  players: Player[];
  selectedSport: string;
}

export const ActiveRetiredSelector: React.FC<ActiveRetiredSelectorProps> = ({
  selectedActiveRetired,
  onSelectActiveRetired,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      onSelectActiveRetired(null);
    } else {
      onSelectActiveRetired(value === "active" ? 1 : 0);
    }
  };

  return (
    <select
      aria-label="Choose an active or retired player"
      value={selectedActiveRetired === null ? "all" : selectedActiveRetired === 1 ? "active" : "retired"}
      onChange={handleChange}
      className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
    >
      <option value="active">Active</option>
      <option value="retired">Retired</option>
      <option value="all">All players</option>
    </select>
  );
};