import { useDrop, useDrag } from "react-dnd";
import { Player as PlayerType } from "../data/players";
import { Theme } from "../types/sports";
import Image from "next/image";
import { slotSizes } from "../types/slotSizes";
import { Sport } from "../types/sports";

const getImagePath = (fullPath: string) => {
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  } catch (error) {
    console.error("Erreur lors du traitement du chemin d'image:", error);
    return 'images/portrait-default.png';
  }
};

const getFlagPath = (fullPath: string) => {
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  } catch (error) {
    console.error("Erreur lors du traitement du chemin du drapeau:", error);
    return 'images/default-flag.png';
  }
};

const getTeamLogoPath = (fullPath: string) => {
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  } catch (error) {
    console.error("Erreur lors du traitement du chemin du logo:", error);
    return 'images/team-default.png';
  }
};

interface FormationSlotProps {
  position: string;
  player: PlayerType | null;
  onDropPlayer: (position: string, player: PlayerType | null) => void;
  isPlayerAlreadyPlaced: boolean;
  theme: Theme;
  positionId: string;
  sport: Sport;
}

export const FormationSlot = ({ 
  position, 
  player, 
  onDropPlayer,
  isPlayerAlreadyPlaced,
  theme,
  positionId,
  sport
}: FormationSlotProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: player ? player : {},
    canDrag: !!player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PLAYER",
    drop: (item: PlayerType) => {
      onDropPlayer(position, item);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }));

  const ref = (node: HTMLDivElement | null) => {
    drag(drop(node));
  };

  const renderPlayerContent = () => {
    if (!player) {
      return <span className="text-gray-400 italic">{position}</span>;
    }

    return (
      <div className="flex flex-col items-center w-full h-full p-2">
        <div className="relative w-full h-3/4 mb-2">
          <Image 
            src={`/${getImagePath(player.photo)}`}
            alt={player.name}
            fill
            className="object-cover rounded-sm"
            sizes="100%"
          />
        </div>
        <div className="flex items-center justify-center gap-1 mb-1">
          {player.flag && (
            <div className="relative w-6 h-4">
              <Image
                src={`/${getFlagPath(player.flag)}`}
                alt={`Drapeau ${player.nationality}`}
                fill
                className="object-contain"
                sizes="24px"
              />
            </div>
          )}
          {player.team_logo && (
            <div className="relative w-6 h-6 bg-white rounded-sm p-1">
              <Image
                src={`/${getTeamLogoPath(player.team_logo)}`}
                alt={`Logo ${player.team}`}
                fill  
                className="object-contain"
                sizes="24px"
              />
            </div>
          )}
        </div>
        <span className="font-semibold text-gray-800 text-xs text-center">
          {`${player.lastname} ${player.name}`}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs">{player.nationality}</span>
        </div>
        <button
          onClick={() => onDropPlayer(position, null)}
          className={`absolute -top-2 -right-2 ${theme.cross} ${theme.crossHover} text-white rounded-full w-6 h-6 
          flex items-center justify-center opacity-0 group-hover:opacity-100 
          transition-opacity duration-200`}
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      data-position={positionId}
      className={`
        ${slotSizes[sport].width} ${slotSizes[sport].height}
        border-2 border-yellow-500 rounded-sm 
        flex items-center justify-center 
        relative group 
        transition-all duration-200 
        shadow-sm hover:shadow-md
        ${isOver 
          ? isPlayerAlreadyPlaced 
            ? "bg-red-100 border-red-500" 
            : "bg-green-100 border-green-500" 
          : "bg-gray-50 border-gray-300"
        }
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
    >
      {renderPlayerContent()}
      {isOver && isPlayerAlreadyPlaced && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-600 text-xs p-1 text-center">
          Already occupied
        </div>
      )}
    </div>
  );
};