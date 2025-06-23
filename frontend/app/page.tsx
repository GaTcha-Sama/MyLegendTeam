"use client";

import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PlayerCard } from "./components/PlayerCard";
import { FormationSlot } from "./components/FormationSlot";
import { SportSelector } from "./components/SportSelector";
import { NationalitySelector } from "./components/NationalitySelector";
import { PositionSelector } from "./components/PositionSelector";
import { TeamSelector } from "./components/TeamSelector";
import { ActiveRetiredSelector } from "./components/ActiveRetiredSelector";
import { Sport, sportThemes, sportPositions } from "./types/sports";
import { Player as PlayerType } from "./data/players";
import { fetchPlayers } from "../lib/api";
import { FilterPlayers } from "./components/FilterPlayers";
import { formationCoords } from "./styles/formation";

export default function DreamTeamBuilder() {
  const [team, setTeam] = useState<Record<string, { id: number; name: string } | null>>({});
  const [selectedSport, setSelectedSport] = useState<Sport>("rugby");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedActiveRetired, setSelectedActiveRetired] = useState<number | null>(null);
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

  const resetSelectedFilters = () => {
    setSelectedNationality("");
    setSelectedPosition("");
    setSelectedTeam("");
    setSelectedActiveRetired(null);
    setFilteredPlayers([]);
  };

  useEffect(() => {
    resetSelectedFilters();
  }, [selectedSport]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSport, selectedNationality, selectedTeam, selectedPosition, selectedActiveRetired]);

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
        if (prev[position]) {
          newTeam[currentSlot] = prev[position];
          newTeam[position] = player;
        } else {
          newTeam[currentSlot] = null;
          newTeam[position] = player;
        }
      } else {
        newTeam[position] = player;
      }
      
      return newTeam;
    });
  };


  const resetTeam = () => {
    setTeam({});
    resetSelectedFilters();
  };

  const currentTheme = sportThemes[selectedSport.toLowerCase() as Sport];

  const playersToShow = (filteredPlayers.length > 0 ? filteredPlayers : players
    .filter(player => {
      return player.sport.toLowerCase() === selectedSport && 
             !isPlayerInTeam(player.id) &&
             (selectedNationality === "" || player.nationality === selectedNationality) &&
             (selectedPosition === "" || player.position === selectedPosition) &&
             (selectedTeam === "" || player.team1 === selectedTeam || player.team2 === selectedTeam || player.team3 === selectedTeam) &&
             (selectedActiveRetired === null || player.active === selectedActiveRetired)
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
            <div className="flex justify-between items-center border-b pb-3 border-black">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Players
              </h2>
              <button
              onClick={resetSelectedFilters}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            </div>
            <div className="flex flex-col max-w-full">
              <div className="flex gap-3 justify-around">
                <SportSelector selectedSport={selectedSport} onSelectSport={setSelectedSport} players={players} />
                <NationalitySelector selectedNationality={selectedNationality} onSelectNationality={setSelectedNationality} players={players} selectedSport={selectedSport} />
                <TeamSelector selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} players={players} selectedSport={selectedSport} />
              </div>
              <div className="flex gap-3 justify-around">
                <PositionSelector selectedPosition={selectedPosition} onSelectPosition={setSelectedPosition} players={players} selectedSport={selectedSport} />
                <ActiveRetiredSelector selectedActiveRetired={selectedActiveRetired} onSelectActiveRetired={setSelectedActiveRetired} players={players} selectedSport={selectedSport} />
                <FilterPlayers 
                  onFilterChange={setFilteredPlayers}
                  players={players}
                  selectedSport={selectedSport}
                  isPlayerInTeam={isPlayerInTeam}
                  selectedNationality={selectedNationality}
                  selectedPosition={selectedPosition}
                  selectedTeam={selectedTeam}
                  selectedActiveRetired={selectedActiveRetired} 
                />
              </div>
            </div>
            {/* Grid of players */}
            <div className="flex justify-center mb-2 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                <select
                  title="Page"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="px-2 py-1 rounded bg-gray-800 cursor-pointer text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  {Array.from({ length: Math.ceil(playersToShow.length / playersPerPage) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-gray-800">
                  / {Math.ceil(playersToShow.length / playersPerPage)}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(Math.ceil(playersToShow.length / playersPerPage), p + 1))}
                disabled={currentPage === Math.ceil(playersToShow.length / playersPerPage)}
                className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <div className="text-center py-4 col-span-2">Loading players...</div>
              ) : (
                paginatedPlayers.map((player) => (
                  <PlayerCard 
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
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              Reset Team
            </button>
          </div>
          <div
            className="terrain"
            style={{
              position: "relative",
              width: 1200,
              height: 900,
              background: selectedSport === "rugby"
                ? 'url("/images/rugby-field.jpg") no-repeat center/cover'
                : selectedSport === "football"
                ? 'url("/images/foot-field.jpg") no-repeat center/cover'
                : selectedSport === "basketball"
                ? 'url("/images/basket-field.jpg") no-repeat center/cover'
                : selectedSport === "hockey"
                ? 'url("/images/hockey-field.png") no-repeat center/cover'
                : selectedSport === "handball"
                ? 'url("/images/handball-field.jpg") no-repeat center/cover'
                : ""
            }}
          >
            {sportPositions[selectedSport].map((position) => {
              const coords = formationCoords[selectedSport][position.id];
              if (!coords) return null;
              return (
                <div
                  key={position.id}
                  style={{
                    position: "absolute",
                    top: coords.top,
                    left: coords.left,
                    width: 60,
                    height: 60,
                    zIndex: 2,
                  }}
                  data-position={position.id}
                >
                  <FormationSlot
                    position={position.name}
                    positionId={position.id}
                    player={team[position.id] as PlayerType | null}
                    onDropPlayer={(_, player) => handleDropPlayer(position.id, player)}
                    isPlayerAlreadyPlaced={isPlayerInTeam(team[position.id]?.id || 0)}
                    theme={currentTheme}
                    sport={selectedSport}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
