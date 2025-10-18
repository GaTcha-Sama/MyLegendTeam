import { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { Player as PlayerType } from "../types/players";
import { slotSizes } from "../types/slotSizes";
import { canPlayerBePlacedOnSlot } from "../utils/canPlayerBePlacedOnSlot";
import { FormationSlotProps } from "../types/formationSlotProps";
import { getPortraitPath, getFlagPath, getTeamLogoPath } from "../utils/imageHelpers";
import Image from "next/image";

const getSilhouettePath = (positionId: string, sport: string) => {
  if (sport !== "rugby" && sport !== "basketball" && sport !== "hockey") return null;
  
  const silhouetteRugbyMapping: { [key: string]: string } = {
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
    "rugby_substitute1": "sub.webp",
    "rugby_substitute2": "sub.webp",
    "rugby_substitute3": "sub.webp",
    "rugby_substitute4": "sub.webp",
    "rugby_substitute5": "sub.webp",
    "rugby_substitute6": "sub.webp",
    "rugby_substitute7": "sub.webp",
    "rugby_substitute8": "sub.webp"
  };

  const silhouetteBasketballMapping: { [key: string]: string } = {
    "point": "pg.webp",
    "shooting": "sg.webp",
    "small": "sf.webp",
    "power": "pf.webp",
    "center": "ce.webp",
    "basketball_substitute1": "sub.webp",
    "basketball_substitute2": "sub.webp",
    "basketball_substitute3": "sub.webp",
    "basketball_substitute4": "sub.webp",
    "basketball_substitute5": "sub.webp"
  };

  const silhouetteIceHockeyMapping: { [key: string]: string } = {
    "goalie1": "gk.webp",
    "goalie2": "gk.webp",
    "defense1": "def.webp",
    "defense2": "def.webp",
    "defense3": "def.webp",
    "defense4": "def.webp",
    "defense5": "def.webp",
    "defense6": "def.webp",
    "forward1": "wing.webp",
    "forward2": "center.webp",
    "forward3": "wing.webp",
    "forward4": "wing.webp",
    "forward5": "center.webp",
    "forward6": "wing.webp",
    "forward7": "wing.webp",
    "forward8": "center.webp",
    "forward9": "wing.webp",
    "forward10": "wing.webp",
    "forward11": "center.webp",
    "forward12": "wing.webp",
  };
  
  let silhouetteFile = silhouetteRugbyMapping[positionId];
  if (sport === "basketball") {
    silhouetteFile = silhouetteBasketballMapping[positionId];
  }
  if (sport === "hockey") {
    silhouetteFile = silhouetteIceHockeyMapping[positionId];
  }
  return silhouetteFile ? `/images/${sport}/silhouettes/${silhouetteFile}` : null;
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
  team,
  onSlotClick
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
            <span className="font-semibold text-black text-xs text-center mt-1 font-[family-name:var(--font-title)]">
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
        <span className="font-semibold text-gray-800 text-xs text-center flex items-center justify-center gap-1 font-[family-name:var(--font-title)]">
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
          onClick={(e) => {
            e.stopPropagation();
            onDropPlayer(position, null);
          }}
          className={`absolute -top-2 -right-2 ${theme.cross} ${theme.crossHover} text-white rounded-full w-6 h-6 
          flex items-center justify-center opacity-0 group-hover:opacity-100 
          transition-opacity duration-200`}
        >
          ×
        </button>
      </div>
    );
  };

  const handleSlotClick = () => {
    if (onSlotClick) {
      onSlotClick(positionId);
    }
  };

  return (
    <div
      ref={ref}
      data-position={positionId}
      onClick={handleSlotClick}
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