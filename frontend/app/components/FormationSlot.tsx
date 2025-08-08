import { useDrop, useDrag } from "react-dnd";
import { Player as PlayerType } from "../types/players";
import { Theme } from "../types/sports";
import Image from "next/image";
import { slotSizes } from "../types/slotSizes";
import { Sport, canPlayerBePlacedOnSlot } from "../types/sports";
import { useState } from "react";

const getImagePath = (fullPath: string) => {
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    // Convertir en WebP
    const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
  } catch (error) {
    console.error("Erreur lors du traitement du chemin d'image:", error);
    return 'images/portrait-default.webp';
  }
};

const getFlagPath = (fullPath: string) => {
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    // Convertir en WebP
    const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
  } catch (error) {
    console.error("Erreur lors du traitement du chemin du drapeau:", error);
    return 'images/default-flag.webp';
  }
};

const getTeamLogoPath = (fullPath: string) => {
  try {
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    // Convertir en WebP
    const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
  } catch (error) {
    console.error("Erreur lors du traitement du chemin du logo:", error);
    return 'images/team-default.webp';
  }
};

// Mapping des positions de joueurs vers les slots autorisés pour le rugby
export const rugbyPositionSlotMapping: Record<string, string[]> = {
  "Prop": ["prop1", "prop2", "rugby_substitute1", "rugby_substitute2"],
  "Hooker": ["hooker", "rugby_substitute3"],
  "Lock": ["lock1", "lock2", "rugby_substitute4"],
  "Flanker": ["flanker1", "flanker2", "rugby_substitute5"],
  "Number 8": ["number8", "rugby_substitute5"],
  "Scrum half": ["scrumhalf", "rugby_substitute6"],
  "Fly half": ["flyhalf", "rugby_substitute7"],
  "Wing": ["wing1", "wing2", "rugby_substitute8"],
  "Center": ["center1", "center2", "rugby_substitute8"],
  "Full back": ["fullback", "rugby_substitute8"]
};

interface FormationSlotProps {
  position: string;
  player: PlayerType | null;
  onDropPlayer: (position: string, player: PlayerType | null) => void;
  isPlayerAlreadyPlaced: boolean;
  theme: Theme;
  positionId: string;
  sport: Sport;
  draggedPlayer?: PlayerType | null; // Nouveau prop pour le joueur en cours de drag
}

export const FormationSlot = ({ 
  position, 
  player, 
  onDropPlayer,
  isPlayerAlreadyPlaced,
  theme,
  positionId,
  sport,
  draggedPlayer
}: FormationSlotProps) => {
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [useDefaultFlag, setUseDefaultFlag] = useState(false);
  const [useDefaultTeamLogo, setUseDefaultTeamLogo] = useState(false);

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
    canDrop: (item: PlayerType) => {
      return canPlayerBePlacedOnSlot(item.position, positionId, sport);
    },
    collect: (monitor) => ({ 
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const ref = (node: HTMLDivElement | null) => {
    drag(drop(node));
  };

  // Déterminer si le slot est valide pour le joueur en cours de drag
  const isSlotValidForDraggedPlayer = draggedPlayer ? 
    canPlayerBePlacedOnSlot(draggedPlayer.position, positionId, sport) : 
    true;

  const renderPlayerContent = () => {
    if (!player) {
      return <span className="text-gray-400 italic">{position}</span>;
    }
    const renderTeamLogos = () => {
      const logos = [];
      
      if (player.team1_logo) {
        logos.push(
          <div key="team1" className="relative w-6 h-6 rounded-sm p-1">
            <Image
              src={`/${getTeamLogoPath(player.team1_logo)}`}
              alt={`Logo ${player.team1}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultTeamLogo(true)}
              unoptimized={useDefaultTeamLogo}
            />
          </div>
        );
      }
      
      if (player.team2_logo) {
        logos.push(
          <div key="team2" className="relative w-6 h-6 rounded-sm p-1">
            <Image
              src={`/${getTeamLogoPath(player.team2_logo)}`}
              alt={`Logo ${player.team2}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultTeamLogo(true)}
              unoptimized={useDefaultTeamLogo}
            />
          </div>
        );
      }
      
      if (player.team3_logo) {
        logos.push(
          <div key="team3" className="relative w-6 h-6 rounded-sm p-1">
            <Image
              src={`/${getTeamLogoPath(player.team3_logo)}`}
              alt={`Logo ${player.team3}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultTeamLogo(true)}
              unoptimized={useDefaultTeamLogo}
            />
          </div>
        );
      }

      return logos.length > 0 ? (
        <div className="flex flex-col gap-1">
          {logos}
        </div>
      ) : null;
    };

    return (
      <div className="flex flex-col items-center w-full h-full">
        <div className="relative w-full h-full">
          <Image 
            src={`/${getImagePath(player.photo)}`}
            alt={player.name}
            fill
            className="object-cover rounded-sm object-top"
            sizes="100%"
            onError={() => setUseDefaultImage(true)}
            unoptimized={useDefaultImage}
          />
          <div className="absolute left-1 right-1 flex justify-between">
            {player.flag && (
              <div className="relative w-6 h-4">
                <Image
                  src={`/${getFlagPath(player.flag)}`}
                  alt={`Drapeau ${player.nationality}`}
                  fill
                  className="object-contain"
                  sizes="24px"
                  onError={() => setUseDefaultFlag(true)}
                  unoptimized={useDefaultFlag}
                />
              </div>
            )}
            {renderTeamLogos()}
          </div>
        </div>
        <span className="font-semibold text-gray-800 text-xs text-center">
          {`${player.lastname} ${player.name}`}
        </span>
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
        border-2 rounded-sm 
        flex items-center justify-center 
        relative group 
        transition-all duration-200 
        shadow-sm hover:shadow-md
        ${isOver 
          ? isPlayerAlreadyPlaced 
            ? "bg-red-100 border-red-500" 
            : isSlotValidForDraggedPlayer
              ? "bg-green-100 border-green-500"
              : "bg-gray-500 border-gray-600"
          : draggedPlayer && !isSlotValidForDraggedPlayer
            ? "bg-gray-500 border-gray-600 opacity-80"
            : isSlotValidForDraggedPlayer
              ? "bg-gray-50 border-gray-300"
              : "bg-gray-100 border-gray-400 opacity-60"
        }
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${!isSlotValidForDraggedPlayer && draggedPlayer ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {renderPlayerContent()}
      {isOver && isPlayerAlreadyPlaced && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-600 text-xs p-1 text-center">
          Already occupied
        </div>
      )}
      {(isOver || (draggedPlayer && !isSlotValidForDraggedPlayer)) && !isPlayerAlreadyPlaced && !isSlotValidForDraggedPlayer && draggedPlayer && (
        <div className="absolute bg-gray-600 bottom-0 left-0 right-0 text-white text-xs p-1 text-center">
          Invalid position
        </div>
      )}
    </div>
  );
};