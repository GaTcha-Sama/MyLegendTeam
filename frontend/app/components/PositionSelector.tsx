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

  return (
    <div>
      <select
        aria-label="Choose a position"
        value={selectedPosition}
        onChange={(e) => onSelectPosition(e.target.value)}
        className="w-full px-2 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border mb-4 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-[family-name:var(--font-title)]"
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
