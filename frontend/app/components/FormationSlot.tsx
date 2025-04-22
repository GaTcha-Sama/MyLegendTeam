import { useDrop } from "react-dnd";
import { Player as PlayerType } from "../data/players";
import { Theme } from "../types/sports";
import Image from "next/image";

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

interface FormationSlotProps {
  position: string;
  player: PlayerType | null;
  onDropPlayer: (position: string, player: PlayerType | null) => void;
  isPlayerAlreadyPlaced: boolean;
  theme: Theme;
  positionId: string;
}

export const FormationSlot = ({ 
  position, 
  player, 
  onDropPlayer,
  isPlayerAlreadyPlaced,
  theme,
  positionId
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

  const renderPlayerContent = () => {
    if (!player) {
      return <span className="text-gray-400 italic">{position}</span>;
    }

    return (
      <div className="flex flex-col items-center w-full">
        <div className="relative w-18 h-18 mb-1">
          <Image 
            src={`/${getImagePath(player.photo)}`}
            alt={player.name}
            fill
            className="rounded-full object-cover"
            sizes="48px"
          />
        </div>
        <span className="font-semibold text-gray-800 text-sm text-center">
          {`${player.lastname} ${player.name}`}
        </span>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs">{player.nationality}</span>
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
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      data-position={positionId}
      className={`
        w-36 h-20 
        border-2 border-dashed rounded-lg 
        flex items-center justify-center 
        relative group
        ${isOver 
          ? isPlayerAlreadyPlaced 
            ? "bg-red-100 border-red-500" 
            : "bg-green-100 border-green-500" 
          : "bg-gray-50 border-gray-300"
        } 
        transition-all duration-200 
        shadow-sm hover:shadow-md
      `}
    >
      {renderPlayerContent()}
      {isOver && isPlayerAlreadyPlaced && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-600 text-xs p-1 text-center">
          Ce joueur est déjà dans l&apos;équipe
        </div>
      )}
    </div>
  );
};