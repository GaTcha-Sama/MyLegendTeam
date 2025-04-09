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

  const imagePath = getImagePath(player.image_path);

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
      {/* Nom du joueur */}
      <div className="text-lg font-bold mb-3 text-center">
        {`${player.lastname} ${player.name}`}
      </div>

      {/* Container de l'image */}
      <div className="relative w-full aspect-square mb-3 flex-grow">
        <Image 
          src={`/${imagePath}`} 
          alt={`${player.lastname} ${player.name}`} 
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          onError={() => {
            // Au premier échec de chargement, on bascule sur l'image par défaut
            setUseDefaultImage(true);
          }}
          // Désactive le comportement de retry automatique de Next.js
          unoptimized={useDefaultImage}
          priority
        />
      </div>

      {/* Nationalité */}
      <div className="text-base font-medium">
        {player.nationality}
      </div>
    </div>
  );
}; 