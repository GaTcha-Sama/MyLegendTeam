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

const getSilhouettePath = (positionId: string, sport: string) => {
  if (sport !== "rugby") return null;
  
  const silhouetteRugbyMapping: { [key: string]: string } = {
    // Main positions
    "fullback": "15.webp",
    "wing1": "11-14.webp", 
    "wing2": "11-14.webp",
    "center1": "12-13.webp",
    "center2": "12-13.webp",
    "flyhalf": "10.webp",
    "scrumhalf": "9.webp",
    "number8": "8.webp",
    "flanker1": "6-7.webp",
    "flanker2": "6-7.webp",
    "lock1": "4-5.webp",
    "lock2": "4-5.webp",
    "prop1": "1-3.webp",
    "prop2": "1-3.webp",
    "hooker": "2.webp",
    // Substitutes
    "rugby_substitute1": "sub.webp",
    "rugby_substitute2": "sub.webp",
    "rugby_substitute3": "sub.webp",
    "rugby_substitute4": "sub.webp",
    "rugby_substitute5": "sub.webp",
    "rugby_substitute6": "sub.webp",
    "rugby_substitute7": "sub.webp",
    "rugby_substitute8": "sub.webp"
  };
  
  const silhouetteFile = silhouetteRugbyMapping[positionId];
  return silhouetteFile ? `/images/rugby/silhouettes/${silhouetteFile}` : null;
};

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
  onDragEnd,
  enforceLegendaryLimit,
  team
}: FormationSlotProps) => {
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [useDefaultFlag, setUseDefaultFlag] = useState(false);
  const [useDefaultActualTeamLogo, setUseDefaultActualTeamLogo] = useState(false);

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
      if (enforceLegendaryLimit && item.legendary_player === 1) {
        const currentLegendaryCount = Object.values(team).filter(teamPlayer => 
          teamPlayer && teamPlayer.legendary_player === 1
        ).length;
        
        const playerAtThisPosition = team[positionId];
        const isReplacingLegendaryWithLegendary = playerAtThisPosition && playerAtThisPosition.legendary_player === 1;
        
        if (currentLegendaryCount >= 5 && !isReplacingLegendaryWithLegendary) {
          return false;
        }
      }
      
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
      const silhouettePath = getSilhouettePath(positionId, sport);
      if (silhouettePath) {
        return (
          <div className="flex flex-col items-center w-full h-full">
            <div className="relative w-full h-full">
              <Image 
                src={silhouettePath}
                alt={`Silhouette ${position}`}
                fill
                className="object-contain opacity-50 hover:opacity-100 transition-opacity duration-200"
                sizes="100%"
                unoptimized
              />
            </div>
            <span className="font-semibold text-black text-xs text-center mt-1">
              {position}
            </span>
          </div>
        );
      }
      return <span className="text-black italic">{position}</span>;
    }
    const renderTeamLogos = () => {
      if (player.actual_team_logo) {
        return (
          <div className="relative w-6 h-6 rounded-sm p-1">
            <Image
              src={useDefaultActualTeamLogo ? '/images/team-default.webp' : `/${getTeamLogoPath(player.actual_team_logo)}`}
              alt={`Logo ${player.actual_team}`}
              fill  
              className="object-contain"
              sizes="24px"
              onError={() => setUseDefaultActualTeamLogo(true)}
              unoptimized
            />
          </div>
        );
      }
      
      return null;
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
        <span className="font-semibold text-gray-800 text-xs text-center flex items-center justify-center gap-1">
          <span>{`${player.lastname} ${player.name}`}</span>
          {player.legendary_player === 1 && (
            <Image
              src="/images/yellow-star.webp"
              alt="Legendary player"
              width={16}
              height={16}
              className="object-contain"
              unoptimized
            />
          )}
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