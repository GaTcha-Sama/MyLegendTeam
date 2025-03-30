import { useDrag } from "react-dnd";
import { Player as PlayerType } from "../data/players";
import { Theme } from "../types/sports";
import ReactCountryFlag from "react-country-flag";

interface PlayerProps {
  player: PlayerType;
  theme: Theme;
}

export const Player = ({ player, theme }: PlayerProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLAYER",
    item: { id: player.id, name: player.name },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`p-3 bg-gradient-to-r ${theme.primary} ${theme.hover} text-white rounded-lg shadow-md 
      transition-all duration-200 cursor-pointer mb-3 
      font-semibold ${isDragging ? "opacity-50" : ""} flex justify-between items-center`}
    >
      <span>{player.name}</span>
      <ReactCountryFlag
        countryCode={player.nationality}
        svg
        style={{
          width: '2em',
          height: '2em',
        }}
      />
    </div>
  );
}; 