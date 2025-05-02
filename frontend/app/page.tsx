"use client";

import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Player } from "./components/Player";
import { FormationSlot } from "./components/FormationSlot";
import { SportSelector } from "./components/SportSelector";
import { NationalitySelector } from "./components/NationalitySelector";
import { Sport, sportThemes, sportPositions } from "./types/sports";
import { Player as PlayerType } from "./data/players";
import { fetchPlayers } from "../lib/api";
import { PositionSelector } from "./components/PositionSelector";
import { FilterPlayers } from "./components/FilterPlayers";

export default function DreamTeamBuilder() {
  const [team, setTeam] = useState<Record<string, { id: number; name: string } | null>>({});
  const [selectedSport, setSelectedSport] = useState<Sport>("rugby");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 9;

  const isPlayerInTeam = useCallback(
    (playerId: number) => {
      return Object.values(team).some(player => player?.id === playerId);
    },
    [team]
  );

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

  useEffect(() => {
    setSelectedNationality("");
  }, [selectedSport]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSport, selectedNationality, selectedPosition]);

  const handleDropPlayer = (position: string, player: { id: number; name: string } | null) => {
    setTeam((prev) => {
      if (!player) {
        return { ...prev, [position]: null };
      }

      const currentSlot = Object.keys(prev).find(
        (pos) => prev[pos]?.id === player.id
      );

      const newTeam = { ...prev };
      if (currentSlot) {
        newTeam[currentSlot] = null;
      }

      newTeam[position] = player;
      return newTeam;
    });
  };

  const resetTeam = () => {
    setTeam({});
  };

  const currentTheme = sportThemes[selectedSport.toLowerCase() as Sport];

  const playersToShow = (filteredPlayers.length > 0 ? filteredPlayers : players
    .filter(player => {
      return player.sport.toLowerCase() === selectedSport && 
             !isPlayerInTeam(player.id) &&
             (selectedNationality === "" || player.nationality === selectedNationality) &&
             (selectedPosition === "" || player.position === selectedPosition)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const paginatedPlayers = playersToShow.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex p-6 min-h-screen bg-gradient-to-br from-gray-600 to-gray-300">
        {/* Sidebar with the list of players */}
        <div className="w-1/3 p-6 bg-white rounded-xl shadow-lg mr-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Players
              </h2>
              <FilterPlayers 
                onFilterChange={setFilteredPlayers}
                players={players}
                selectedSport={selectedSport}
                isPlayerInTeam={isPlayerInTeam}
                selectedNationality={selectedNationality}
                selectedPosition={selectedPosition}
              />
            </div>
            <div className="flex gap-4 justify-between">
              <SportSelector selectedSport={selectedSport} onSelectSport={setSelectedSport} players={players} />
              <NationalitySelector selectedNationality={selectedNationality} onSelectNationality={setSelectedNationality} players={players} selectedSport={selectedSport} />
              <PositionSelector selectedPosition={selectedPosition} onSelectPosition={setSelectedPosition} players={players} selectedSport={selectedSport} />
            </div>
            {/* Grid of players */}
            <div className="flex justify-center mb-2 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50 cursor-pointer"
              >
                Précédent
              </button>
              <span className="text-gray-800 mt-1">{currentPage} / {Math.ceil(playersToShow.length / playersPerPage)}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(Math.ceil(playersToShow.length / playersPerPage), p + 1))}
                disabled={currentPage === Math.ceil(playersToShow.length / playersPerPage)}
                className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50 cursor-pointer"
              >
                Suivant
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <div className="text-center py-4 col-span-2">Loading players...</div>
              ) : (
                paginatedPlayers.map((player) => (
                  <Player 
                    key={player.id} 
                    player={player} 
                    theme={currentTheme} 
                  />
                ))
              )}
            </div>
            
          </div>
        </div>

        {/* Field */}
        <div className="flex-1 p-4 bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4 text-gray-800 border-b pb-3">
            <h2 className="text-2xl font-bold">
              My Legend Team for {selectedSport}
            </h2>
            <button
              onClick={resetTeam}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Reset Team
            </button>
          </div>
          <div className={`grid gap-4 p-6 min-h-[750px] relative grid-cols-4
            ${selectedSport === 'football' ? 'formation-football bg-[url("/images/foot-field.jpg")]' : 
              selectedSport === 'rugby' ? 'formation-rugby bg-[url("/images/rugby-field.jpg")]' :
              selectedSport === 'hockey' ? 'formation-hockey bg-[url("/images/hockey-field.png")]' :
              selectedSport === 'basketball' ? 'formation-basketball bg-[url("/images/basket-field.jpg")]' :
              selectedSport === 'handball' ? 'formation-handball bg-[url("/images/handball-field.jpg")]' : ''} 
            bg-cover bg-center bg-no-repeat`}>
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
