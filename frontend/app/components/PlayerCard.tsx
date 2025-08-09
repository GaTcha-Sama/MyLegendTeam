import { useDrag } from "react-dnd";
import { PlayerCardProps } from "../types/playerCardProps";
import Image from "next/image";

export const PlayerCard = ({ player, theme, onDragStart, onDragEnd }: PlayerCardProps) => {
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
                src={`/${teamLogoPath1}`}
                alt={`Logo ${player.team1}`}
                className="object-contain max-w-full max-h-full"
                sizes="64px"
                height={48}
                width={64}
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 