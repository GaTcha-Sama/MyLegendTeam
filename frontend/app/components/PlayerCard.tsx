import { useDrag } from "react-dnd";
import { PlayerCardProps } from "../types/playerCardProps";
import Image from "next/image";
import { useState } from "react";
import { getPortraitPath, getFlagPath, getTeamLogoPath } from "../utils/imageHelpers";

export const PlayerCard = ({ player, theme, onDragStart, onDragEnd, selectedPosition, isDisabled }: PlayerCardProps) => {
  const [useDefaultTeamLogo1, setUseDefaultTeamLogo1] = useState(false);
  const [useDefaultTeamLogo2, setUseDefaultTeamLogo2] = useState(false);
  const [useDefaultTeamLogo3, setUseDefaultTeamLogo3] = useState(false);
  const [useDefaultActualTeamLogo, setUseDefaultActualTeamLogo] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: () => {
      if (isDisabled) return {}; // Ne pas permettre le drag si désactivé
      onDragStart?.();
      return player;
    },
    canDrag: !isDisabled, // Empêcher le drag si désactivé
    end: () => {
      onDragEnd?.();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const imagePath = getPortraitPath(player.photo);
  const flagPath = getFlagPath(player.flag);
  const teamLogoPath1 = getTeamLogoPath(player.team1_logo);
  const teamLogoPath2 = getTeamLogoPath(player.team2_logo);
  const teamLogoPath3 = getTeamLogoPath(player.team3_logo);
  const actualTeamLogoPath = getTeamLogoPath(player.actual_team_logo);

  const isPrimaryPosition = selectedPosition && player.position1 === selectedPosition;
  const isSecondaryPosition = selectedPosition && player.position2 === selectedPosition;
  
  const getPositionStyle = () => {
    if (isPrimaryPosition) {
      return "ring-4 ring-yellow-400 ring-opacity-80 shadow-lg";
    } else if (isSecondaryPosition) {
      return "ring-2 ring-gray-400 ring-opacity-60 opacity-80";
    }
    return "";
  };

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`
        relative p-2 
        bg-gradient-to-r ${theme.primary} ${theme.hover} 
        text-white 
        rounded-lg 
        shadow-md 
        transition-all 
        duration-200 
        flex 
        flex-col 
        items-center 
        justify-between
        min-h-[280px]
        w-full
        ${isDragging ? "opacity-50" : ""}
        ${getPositionStyle()}
        ${isDisabled ? "opacity-50 grayscale cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* Indicateur de position si une position est sélectionnée */}
      {(isPrimaryPosition || isSecondaryPosition) && (
        <div className={`
          absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold z-10
        `}>
        
        </div>
      )}

      <div className="text-sm font-bold mb-1 text-center flex items-center justify-center gap-2">
        <span className="font-[family-name:var(--font-title)]">{`${player.lastname} ${player.name}`}</span>
        {player.legendary_player === 1 && (
          <Image
            src="/images/yellow-star.webp"
            alt="Legendary player"
            width={20}
            height={20}
            className="object-contain mb-1"
            unoptimized
          />
        )}
      </div>

      <div className="relative w-full aspect-square mb-3 flex-grow bg-white rounded-lg">
        <Image 
          src={`/${imagePath}`} 
          alt={`${player.lastname} ${player.name}`} 
          fill
          className="rounded-lg object-top object-cover bg-gray-400"
          sizes="(max-width: 768px) 100vw, 300px"
          unoptimized={true}
          priority
        />
        {player.flag && (
          <div className="absolute top-1 left-1 w-8">
            <Image
              src={`/${flagPath}`}
              alt={`Drapeau ${player.nationality}`}
              className="object-contain"
              sizes="24px"
              height={24}
              width={24}
            />
          </div>
        )}
        
        {/* Actual team */}
        {player.actual_team_logo && (
          <div className="absolute top-1 right-0 w-8">
            <Image
              src={useDefaultActualTeamLogo ? '/images/team-default.webp' : `/${actualTeamLogoPath}`}
              alt={`Logo ${player.actual_team}`}
              className="object-contain"
              sizes="24px"
              height={24}
              width={24}
              onError={() => setUseDefaultActualTeamLogo(true)}
              unoptimized
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        {/* Career teams */}
        <div className="text-xs text-center text-gray-200 font-[family-name:var(--font-title)]">Career teams</div>
        <div className="flex items-center gap-1 justify-center w-full">
          {player.team1_logo && (
            <div 
              className="relative flex-1 h-12 bg-gray-400 rounded-sm p-1 flex items-center justify-center group"
              title={player.team1}
            >
              <Image
                src={useDefaultTeamLogo1 ? '/images/team-default.webp' : `/${teamLogoPath1}`}
                alt={`Logo ${player.team1}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => setUseDefaultTeamLogo1(true)}
                unoptimized
              />
            </div>
          )}
          {player.team2_logo && (
            <div 
              className="relative flex-1 h-12 bg-gray-400 rounded-sm p-1 flex items-center justify-center group"
              title={player.team2}
            >
              <Image
                src={useDefaultTeamLogo2 ? '/images/team-default.webp' : `/${teamLogoPath2}`}
                alt={`Logo ${player.team2}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => setUseDefaultTeamLogo2(true)}
                unoptimized
              />
            </div>
          )}
          {player.team3_logo && (
            <div 
              className="relative flex-1 h-12 bg-gray-400 rounded-sm p-1 flex items-center justify-center group"
              title={player.team3}
            >
              <Image
                src={useDefaultTeamLogo3 ? '/images/team-default.webp' : `/${teamLogoPath3}`}
                alt={`Logo ${player.team3}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => setUseDefaultTeamLogo3(true)}
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 