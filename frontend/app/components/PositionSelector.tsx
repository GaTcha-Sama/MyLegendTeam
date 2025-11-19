import { PositionSelectorProps } from "../types/positionSelectorProps";
import { getOrderedPositions } from "../utils/getOrderedPositions";
import { Sport } from "../types/sports";

export const PositionSelector = ({
  selectedPosition,
  onSelectPosition,
  players,
  selectedSport,
}: PositionSelectorProps) => {
  const allPositions = players
    .filter((p) => p.sport.toLowerCase() === selectedSport.toLowerCase())
    .flatMap((p) => [p.position1, p.position2])
    .filter((pos) => pos && pos.trim() !== "");

  const existingPositions = Array.from(new Set(allPositions));

  const normalize = (s: string) => s.toLowerCase().replace(/\s|-/g, "");

  const ordered = getOrderedPositions(selectedSport.toLowerCase() as Sport, "en");
  const orderMap = new Map<string, number>();
  ordered.forEach((pos, idx) => {
    const baseName = pos.name.includes(" - ") ? pos.name.split(" - ")[1].trim() : pos.name;
    const key = normalize(baseName);
    if (!orderMap.has(key)) orderMap.set(key, idx);
  });

  const rank = (s: string) => {
    const v = orderMap.get(normalize(s));
    return v === undefined ? Number.POSITIVE_INFINITY : v;
  };

  const positions = [...existingPositions].sort((a, b) => rank(a) - rank(b));

  const resetPosition = () => {
    onSelectPosition("");
  };

  return (
    <div className="relative">
      <select
        aria-label="Choose a position"
        value={selectedPosition}
        onChange={(e) => onSelectPosition(e.target.value)}
        className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)] pr-10"
      >
        <option value="">All {selectedSport} positions</option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>
      {selectedPosition && selectedPosition !== "" && (
        <button
          onClick={resetPosition}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-red-100"
          aria-label="Clear position"
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
