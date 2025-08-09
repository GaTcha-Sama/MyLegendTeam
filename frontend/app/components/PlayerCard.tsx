import { useDrag } from "react-dnd";
import { PlayerCardProps } from "../types/playerCardProps";
import Image from "next/image";
import { useState } from "react";

export const PlayerCard = ({ player, theme, onDragStart, onDragEnd }: PlayerCardProps) => {
  const [useDefaultTeamLogo1, setUseDefaultTeamLogo1] = useState(false);
  const [useDefaultTeamLogo2, setUseDefaultTeamLogo2] = useState(false);
  const [useDefaultTeamLogo3, setUseDefaultTeamLogo3] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: () => {
      onDragStart?.();
      return player;
    },
    end: () => {
      onDragEnd?.();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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

  const imagePath = getPortraitPath(player.photo);
  const flagPath = getFlagPath(player.flag);
  const teamLogoPath1 = getTeamLogoPath(player.team1_logo);
  const teamLogoPath2 = getTeamLogoPath(player.team2_logo);
  const teamLogoPath3 = getTeamLogoPath(player.team3_logo);

  console.log('Player:', player.name, player.lastname);
  console.log('team1_logo original:', player.team1_logo);
  console.log('teamLogoPath1 traité:', teamLogoPath1);
  console.log('team2_logo original:', player.team2_logo);
  console.log('teamLogoPath2 traité:', teamLogoPath2);
  console.log('team3_logo original:', player.team3_logo);
  console.log('teamLogoPath3 traité:', teamLogoPath3);

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`
        p-2 
        bg-gradient-to-r ${theme.primary} ${theme.hover} 
        text-white 
        rounded-lg 
        shadow-md 
        transition-all 
        duration-200 
        cursor-pointer 
        flex 
        flex-col 
        items-center 
        justify-between
        min-h-[280px]
        w-full
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <div className="text-sm font-bold mb-3 text-center">
        {`${player.lastname} ${player.name}`}
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
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
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