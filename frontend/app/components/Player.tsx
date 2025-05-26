import { useDrag } from "react-dnd";
import { Player as PlayerType } from "../data/players";
import { Theme } from "../types/sports";
import Image from "next/image";
import { useState } from "react";

interface PlayerProps {
  player: PlayerType;
  theme: Theme;
}

export const Player = ({ player, theme }: PlayerProps) => {
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [useDefaultFlag, setUseDefaultFlag] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLAYER",
    item: { 
      id: player.id,
      name: player.name,
      lastname: player.lastname,
      photo: player.photo,
      flag: player.flag,
      team_logo: player.team_logo,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));

  const getImagePath = (fullPath: string) => {
    if (useDefaultImage) {
      return 'images/portrait-default.png';
    }
  
    try {
      const normalizedPath = fullPath.replace(/\\/g, '/');      
      const cleanPath = normalizedPath.replace(/^public\//, '');      
      return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
    } catch (error) {
      console.error("Erreur lors du traitement du chemin de portrait:", error);
      return 'images/portrait-default.png';
    }
  };
  
  const getFlagPath = (fullPath: string) => {
    if (useDefaultFlag) {
      return 'images/default-flag.jpg';
    }
  
    try {
      const normalizedPath = fullPath.replace(/\\/g, '/');
      const cleanPath = normalizedPath.replace(/^public\//, '');
      return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
    } catch (error) {
      console.error("Erreur lors du traitement du chemin du drapeau:", error);
      return 'images/default-flag.jpg';
    }
  };

  const getTeamLogoPath = (fullPath: string) => {
    if (!fullPath) return 'images/team-default.png';
    
    try {
      const normalizedPath = fullPath.replace(/\\/g, '/');
      const cleanPath = normalizedPath.replace(/^public\//, '');
      return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
    } catch (error) {
      console.error("Erreur lors du traitement du chemin du logo:", error);
      return 'images/team-default.png';
    }
  };

  const imagePath = getImagePath(player.photo);
  const flagPath = getFlagPath(player.flag);
  const teamLogoPath = getTeamLogoPath(player.team_logo);

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
          onError={() => {
            setUseDefaultImage(true);
          }}
          unoptimized={useDefaultImage}
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
              onError={() => {
                setUseDefaultFlag(true);
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-2 justify-center">
          {player.team_logo && (
            <div className="relative w-16 h-12 bg-gray-400 rounded-sm p-1 flex items-center justify-center">
              <Image
                src={`/${teamLogoPath}`}
                alt={`Logo ${player.team}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => {
                  console.error(`Erreur de chargement du logo pour ${player.team}`);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 