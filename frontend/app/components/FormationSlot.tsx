import { useDrop } from "react-dnd";
import { Player as PlayerType } from "../data/players";
import { Theme } from "../types/sports";

interface FormationSlotProps {
  position: string;
  player: PlayerType | null;
  onDropPlayer: (position: string, player: PlayerType | null) => void;
  isPlayerAlreadyPlaced: boolean;
  theme: Theme;
}

export const FormationSlot = ({ 
  position, 
  player, 
  onDropPlayer,
  isPlayerAlreadyPlaced,
  theme
}: FormationSlotProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PLAYER",
    drop: (item: PlayerType) => {
      if (!isPlayerAlreadyPlaced) {
        onDropPlayer(position, item);
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }));

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`w-36 h-20 border-2 border-dashed rounded-lg flex items-center justify-center 
      relative group
      ${isOver ? isPlayerAlreadyPlaced ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500" : "bg-gray-50 border-gray-300"} 
      transition-all duration-200 shadow-sm hover:shadow-md`}
    >
      {player ? (
        <>
          <span className="font-semibold text-gray-800">{player.name}</span>
          <button
            onClick={() => onDropPlayer(position, null)}
            className={`absolute -top-2 -right-2 ${theme.accent} ${theme.accentHover} text-white rounded-full w-6 h-6 
            flex items-center justify-center opacity-0 group-hover:opacity-100 
            transition-opacity duration-200`}
          >
            ×
          </button>
        </>
      ) : (
        <span className="text-gray-400 italic">{position}</span>
      )}
      {isOver && isPlayerAlreadyPlaced && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-600 text-xs p-1 text-center">
          Ce joueur est déjà dans l&apos;équipe
        </div>
      )}
    </div>
  );
}; 