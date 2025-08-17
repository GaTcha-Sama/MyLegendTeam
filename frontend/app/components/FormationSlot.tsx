import { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Player as PlayerType } from "../types/players";
import { slotSizes } from "../types/slotSizes";
import { canPlayerBePlacedOnSlot } from "../utils/canPlayerBePlacedOnSlot";
import { FormationSlotProps } from "../types/formationSlotProps";
import Image from "next/image";

const getProcessedImagePath = (fullPath: string, defaultPath: string, errorType: string = "image") => {
  try {
    if (!fullPath) return defaultPath;
    
    const normalizedPath = fullPath.replace(/\\/g, '/');
    const cleanPath = normalizedPath.replace(/^public\//, '');
    const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
  } catch (error) {
    console.error(`Erreur lors du traitement du chemin ${errorType}:`, error);
    return defaultPath;
  }
};

const getPortraitPath = (fullPath: string) => 
  getProcessedImagePath(fullPath, 'images/portrait-default.webp', "of the player");

const getFlagPath = (fullPath: string) => 
  getProcessedImagePath(fullPath, 'images/default-flag.webp', "of the flag");

const getTeamLogoPath = (fullPath: string) => 
  getProcessedImagePath(fullPath, 'images/team-default.webp', "of the team logo");

export const FormationSlot = ({ 
  position, 
  player, 
  onDropPlayer,
  isPlayerAlreadyPlaced,
  theme,
  positionId,
  sport,
  draggedPlayer,
  onDragStart,
  onDragEnd
}: FormationSlotProps) => {
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [useDefaultFlag, setUseDefaultFlag] = useState(false);
  const [useDefaultTeamLogo1, setUseDefaultTeamLogo1] = useState(false);
  const [useDefaultTeamLogo2, setUseDefaultTeamLogo2] = useState(false);
  const [useDefaultTeamLogo3, setUseDefaultTeamLogo3] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: () => {
      if (player) {
        onDragStart?.();
        return player;
      }
      return {};
    },
    canDrag: !!player,
    end: () => {
      onDragEnd?.();
    },
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
      return canPlayerBePlacedOnSlot(item, positionId, sport);
    },
    collect: (monitor) => ({ 
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const ref = (node: HTMLDivElement | null) => {
    drag(drop(node));
  };

  const isSlotValidForDraggedPlayer = draggedPlayer ? 
    canPlayerBePlacedOnSlot(draggedPlayer, positionId, sport) : 
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
              src={useDefaultTeamLogo1 ? '/images/team-default.webp' : `/${getTeamLogoPath(player.team1_logo)}`}
              alt={`Logo ${player.team1}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultTeamLogo1(true)}
              unoptimized
            />
          </div>
        );
      }
      
      if (player.team2_logo) {
        logos.push(
          <div key="team2" className="relative w-6 h-6 rounded-sm p-1">
            <Image
              src={useDefaultTeamLogo2 ? '/images/team-default.webp' : `/${getTeamLogoPath(player.team2_logo)}`}
              alt={`Logo ${player.team2}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultTeamLogo2(true)}
              unoptimized
            />
          </div>
        );
      }
      
      if (player.team3_logo) {
        logos.push(
          <div key="team3" className="relative w-6 h-6 rounded-sm p-1">
            <Image
              src={useDefaultTeamLogo3 ? '/images/team-default.webp' : `/${getTeamLogoPath(player.team3_logo)}`}
              alt={`Logo ${player.team3}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultTeamLogo3(true)}
              unoptimized
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
            src={`/${getPortraitPath(player.photo)}`}
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