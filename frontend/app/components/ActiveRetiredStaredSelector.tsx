import { ActiveRetiredStaredSelectorProps } from "../types/activeRetiredStaredSelectorProps";

export const ActiveRetiredStaredSelector: React.FC<ActiveRetiredStaredSelectorProps> = ({
  selectedActiveRetiredStared,
  onSelectActiveRetiredStared,
  selectedSport,
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

  const resetStatus = () => {
    onSelectActiveRetiredStared(null);
  };

  return (
    <div className="relative">
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
        className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)] pr-10"
      >
      <option value="all">All {selectedSport} players</option>
      <option value="active">Active</option>
      <option value="retired">Retired</option>
      <option value="legendary">Only the greatest</option>
      </select>
      {selectedActiveRetiredStared !== null && (
        <button
          onClick={resetStatus}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-red-100"
          aria-label="Clear status"
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