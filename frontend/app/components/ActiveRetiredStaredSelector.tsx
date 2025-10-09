import { ActiveRetiredStaredSelectorProps } from "../types/activeRetiredStaredSelectorProps";

export const ActiveRetiredStaredSelector: React.FC<ActiveRetiredStaredSelectorProps> = ({
  selectedActiveRetiredStared,
  onSelectActiveRetiredStared,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      onSelectActiveRetiredStared(null);
    } else if (value === "legendary") {
      onSelectActiveRetiredStared("legendary");
    } else {
      onSelectActiveRetiredStared(value === "active" ? 1 : 0);
    }
  };

  return (
    <select
      aria-label="Choose an active or retired player"
      value={
        selectedActiveRetiredStared === null 
          ? "all" 
          : selectedActiveRetiredStared === 1 
            ? "active" 
            : selectedActiveRetiredStared === 0 
              ? "retired"
              : "legendary"
      }
      onChange={handleChange}
      className="px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)]"
    >
      <option value="active">Active</option>
      <option value="retired">Retired</option>
      <option value="legendary">Only the greatest</option>
      <option value="all">All players</option>
    </select>
  );
};