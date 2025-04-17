"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Player } from "./components/Player";
import { FormationSlot } from "./components/FormationSlot";
import { SportSelector } from "./components/SportSelector";
import { NationalitySelector } from "./components/NationalitySelector";
import { Sport, sportThemes, sportPositions } from "./types/sports";
import { Player as PlayerType } from "./data/players";
import { fetchPlayers } from "../lib/api";

export default function DreamTeamBuilder() {
  const [team, setTeam] = useState<Record<string, { id: number; name: string } | null>>({});
  const [selectedSport, setSelectedSport] = useState<Sport>("rugby");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des joueurs:", error);
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  const handleDropPlayer = (position: string, player: { id: number; name: string } | null) => {
    setTeam((prev) => ({ ...prev, [position]: player }));
  };

  const resetTeam = () => {
    setTeam({});
  };

  const isPlayerInTeam = (playerId: number) => {
    return Object.values(team).some(player => player?.id === playerId);
  };

  const currentTheme = sportThemes[selectedSport.toLowerCase() as Sport];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Sidebar avec la liste des joueurs */}
        <div className="w-1/3 p-6 bg-white rounded-xl shadow-lg mr-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-3">
            Available Players
          </h2>
          <SportSelector selectedSport={selectedSport} onSelectSport={setSelectedSport} players={players} />
          <NationalitySelector selectedNationality={selectedNationality} onSelectNationality={setSelectedNationality} players={players} />
          
          {/* Grille de joueurs */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {loading ? (
              <div className="text-center py-4 col-span-2">Loading players...</div>
            ) : (
              players
                .filter(player => 
                  player.sport.toLowerCase() === selectedSport && 
                  !isPlayerInTeam(player.id) &&
                  (selectedNationality === "" || player.nationality === selectedNationality)
                )
                .map((player) => (
                  <Player 
                    key={player.id} 
                    player={player} 
                    theme={currentTheme} 
                  />
                ))
            )}
          </div>
        </div>

        {/* Terrain */}
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6 text-gray-800 border-b pb-3">
            <h2 className="text-2xl font-bold">
              My {selectedSport} Legend Team
            </h2>
            <button
              onClick={resetTeam}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Reset Team
            </button>
          </div>
          <div className={`grid gap-4 bg-gradient-to-b ${currentTheme.primary} p-6 min-h-[750px] relative grid-cols-4
            ${selectedSport === 'football' ? 'formation-football' : 
              selectedSport === 'rugby' ? 'formation-rugby' :
              selectedSport === 'hockey' ? 'formation-hockey' :
              selectedSport === 'basketball' ? 'formation-basketball' : ''}`}>
            {sportPositions[selectedSport].map((position) => (
              <FormationSlot
                key={position.id}
                position={position.name}
                player={team[position.id] as PlayerType | null}
                onDropPlayer={(_, player) => handleDropPlayer(position.id, player)}
                isPlayerAlreadyPlaced={isPlayerInTeam(team[position.id]?.id || 0)}
                theme={currentTheme}
                positionId={position.id}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
