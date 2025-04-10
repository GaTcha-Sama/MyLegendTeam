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
  // State pour tracker si on utilise l'image par défaut
  const [useDefaultImage, setUseDefaultImage] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLAYER",
    item: { 
      id: player.id,
      name: `${player.lastname} ${player.name}`
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));

  const getImagePath = (fullPath: string) => {
    if (useDefaultImage) {
      return 'images/portrait-default.png';
    }

    try {
      const pathSegments = fullPath.split('public\\');
      if (pathSegments.length > 1) {
        return pathSegments[1].replace(/\\/g, '/');
      }
    } catch (error) {
      console.error("Erreur lors du traitement du chemin d'image:", error);
    }
    
    return 'images/portrait-default.png';
  };

  const imagePath = getImagePath(player.photo);
  const flagPath = getImagePath(player.flag);

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`
        p-4 
        bg-gradient-to-r ${theme.primary} ${theme.hover} 
        text-white 
        rounded-lg 
        shadow-md 
        transition-all 
        duration-200 
        cursor-pointer 
        mb-4
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
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          onError={() => {
            setUseDefaultImage(true);
          }}
          unoptimized={useDefaultImage}
          priority
        />
      </div>

      <div className="flex items-center gap-2 text-base font-medium">
        <span>{player.nationality}</span>
        {player.flag && (
          <div className="relative w-10 h-6">
            <Image
              src={`/${flagPath}`}
              alt={`Drapeau ${player.nationality}`}
              fill
              className="object-contain"
              sizes="24px"
            />
          </div>
        )}
      </div>
    </div>
  );
}; 