import { useDrag } from "react-dnd";
import { Player as PlayerType } from "../types/players";
import { Theme } from "../types/sports";
import Image from "next/image";
import { useState } from "react";

interface PlayerCardProps {
  player: PlayerType;
  theme: Theme;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const PlayerCard = ({ player, theme, onDragStart, onDragEnd }: PlayerCardProps) => {
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [useDefaultFlag, setUseDefaultFlag] = useState(false);
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

  const getImagePath = (fullPath: string) => {
    if (useDefaultImage) {
      return 'images/portrait-default.webp';
    }

    try {
      const normalizedPath = fullPath.replace(/\\/g, '/');      
      const cleanPath = normalizedPath.replace(/^public\//, '');      
      // Convertir en WebP
      const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
    } catch (error) {
      console.error("Erreur lors du traitement du chemin:", error);
      return 'images/portrait-default.webp';
    }
  };
  
  const getFlagPath = (fullPath: string) => {
    if (useDefaultFlag) {
      return 'images/default-flag.webp';
    }
  
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

  const getTeamLogoPath = (fullPath: string, logoIndex: number) => {
    if (!fullPath) return 'images/team-default.webp';
    
    // Vérifier si on doit utiliser le logo par défaut
    const useDefault = logoIndex === 1 ? useDefaultTeamLogo1 : 
                      logoIndex === 2 ? useDefaultTeamLogo2 : 
                      useDefaultTeamLogo3;
    
    if (useDefault) return 'images/team-default.webp';
    
    try {
      const normalizedPath = fullPath.replace(/\\/g, '/');
      const cleanPath = normalizedPath.replace(/^public\//, '');
      const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      return webpPath.startsWith('/') ? webpPath.substring(1) : webpPath;
    } catch (error) {
      console.error("Erreur lors du traitement du chemin du logo:", error);
      return 'images/team-default.webp';
    }
  };

  const imagePath = getImagePath(player.photo);
  const flagPath = getFlagPath(player.flag);
  const teamLogoPath1 = getTeamLogoPath(player.team1_logo, 1);
  const teamLogoPath2 = getTeamLogoPath(player.team2_logo, 2);
  const teamLogoPath3 = getTeamLogoPath(player.team3_logo, 3);

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
              onError={() => {
                setUseDefaultFlag(true);
              }}
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
                src={`/${teamLogoPath1}`}
                alt={`Logo ${player.team1}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => {
                  console.error(`Erreur de chargement du logo pour ${player.team1}`);
                  setUseDefaultTeamLogo1(true);
                }}
                unoptimized={useDefaultTeamLogo1}
              />
            </div>
          )}
          {player.team2_logo && (
            <div 
              className="relative flex-1 h-12 bg-gray-400 rounded-sm p-1 flex items-center justify-center group"
              title={player.team2}
            >
              <Image
                src={`/${teamLogoPath2}`}
                alt={`Logo ${player.team2}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => {
                  console.error(`Erreur de chargement du logo pour ${player.team2}`);
                  setUseDefaultTeamLogo2(true);
                }}
                unoptimized={useDefaultTeamLogo2}
              />
            </div>
          )}
          {player.team3_logo && (
            <div 
              className="relative flex-1 h-12 bg-gray-400 rounded-sm p-1 flex items-center justify-center group"
              title={player.team3}
            >
              <Image
                src={`/${teamLogoPath3}`}
                alt={`Logo ${player.team3}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
                onError={() => {
                  console.error(`Erreur de chargement du logo pour ${player.team3}`);
                  setUseDefaultTeamLogo3(true);
                }}
                unoptimized={useDefaultTeamLogo3}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 