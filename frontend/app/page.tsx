"use client";

import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PlayerCard } from "./components/PlayerCard";
import { FormationSlot } from "./components/FormationSlot";
import { SportSelector } from "./components/SportSelector";
import { NationalitySelector } from "./components/NationalitySelector";
import { TeamSelector } from "./components/TeamSelector";
import { PositionSelector } from "./components/PositionSelector";
import { ActiveRetiredSelector } from "./components/ActiveRetiredSelector";
import { FilterPlayers } from "./components/FilterPlayers";
import { SavedTeamsModal } from "./components/SavedTeamsModal";
import { fetchPlayers } from "../lib/api";
import { Player as PlayerType } from "./types/players";
import { SavedTeam } from "./types/savedTeam";
import { Sport, sportThemes, sportPositions } from "./types/sports";
import { formationCoordsPixels } from "./styles/formationCoordsPixels";

export default function DreamTeamBuilder() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<Sport>("rugby");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedActiveRetired, setSelectedActiveRetired] = useState<boolean | null>(null);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [team, setTeam] = useState<{ [key: string]: PlayerType | null }>({});
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [savedTeamsCount, setSavedTeamsCount] = useState(0);
  const [draggedPlayer, setDraggedPlayer] = useState<PlayerType | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const playersData = await fetchPlayers(selectedSport);
        
        // // Ajout de débogage - TEMPORAIRE
        // if (playersData && playersData.length > 0) {
        //   console.log('Premier joueur:', playersData[0]);
        //   console.log('team1_logo du premier joueur:', playersData[0].team1_logo);
        //   console.log('team2_logo du premier joueur:', playersData[0].team2_logo);
        //   console.log('team3_logo du premier joueur:', playersData[0].team3_logo);
        // }
        
        setPlayers(playersData);
      } catch (error) {
        console.error("Error loading players:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [selectedSport]);

  useEffect(() => {
    const teams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    setSavedTeamsCount(teams.length);
  }, []);

  const resetSelectedFilters = () => {
    setSelectedNationality("");
    setSelectedPosition("");
    setSelectedTeam("");
    setSelectedActiveRetired(null);
    setFilteredPlayers([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPosition]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTeam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedActiveRetired]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSport]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedNationality]);

  const isPlayerInTeam = useCallback((playerId: number) => {
    return Object.values(team).some(player => player?.id === playerId);
  }, [team]);

  const handleDropPlayer = (position: string, player: PlayerType | null) => {
    if (player === null) {
      setTeam(prev => {
        const newTeam = { ...prev };
        delete newTeam[position];
        return newTeam;
      });
      return;
    }

    setTeam(prev => {
      const newTeam = { ...prev };
      
      let playerCurrentPosition: string | null = null;
      Object.keys(newTeam).forEach(pos => {
        if (newTeam[pos]?.id === player.id) {
          playerCurrentPosition = pos;
        }
      });
      
      const playerAtDestination = newTeam[position];
      
      if (playerCurrentPosition && playerAtDestination) {
        newTeam[position] = player;
        newTeam[playerCurrentPosition] = playerAtDestination;
      } else if (playerCurrentPosition) {
        delete newTeam[playerCurrentPosition];
        newTeam[position] = player;
      } else {
        newTeam[position] = player;
      }
      
      return newTeam;
    });
  };

  const resetTeam = () => {
    setTeam({});
  };

  const saveTeam = () => {
    const teamPlayers = Object.values(team).filter(Boolean);
    if (teamPlayers.length === 0) {
      alert("Your team is empty !");
      return;
    }

    const teamName = prompt("Name your team :");
    if (!teamName) return;

    const newTeam: SavedTeam = {
      id: Date.now().toString(),
      name: teamName,
      sport: selectedSport,
      players: team,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTeams = [...savedTeams, newTeam];
    setSavedTeams(updatedTeams);
    localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));
    alert("Team saved !");
  };

  const loadTeam = (teamId: string) => {
    const teamToLoad = savedTeams.find(t => t.id === teamId);
    if (teamToLoad) {
      setTeam(teamToLoad.players as { [key: string]: PlayerType | null });
      setSelectedSport(teamToLoad.sport as Sport);
      setIsModalOpen(false);
    }
  };

  const deleteTeam = (teamId: string) => {
    const updatedTeams = savedTeams.filter((team: SavedTeam) => team.id !== teamId);
    localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));
    alert("Team deleted !");
  };

  const currentTheme = sportThemes[selectedSport.toLowerCase() as Sport];

  const playersToShow = (filteredPlayers.length > 0 ? filteredPlayers : players
    .filter(player => {
      return player.sport.toLowerCase() === selectedSport && 
             !isPlayerInTeam(player.id) &&
             (selectedNationality === "" || player.nationality === selectedNationality) &&
             (selectedPosition === "" || player.position === selectedPosition) &&
             (selectedTeam === "" || player.team1 === selectedTeam || player.team2 === selectedTeam || player.team3 === selectedTeam) &&
             (selectedActiveRetired === null || player.active === (selectedActiveRetired ? 1 : 0))
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const paginatedPlayers = playersToShow.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  );

  const handleDragStart = (player: PlayerType) => {
    setDraggedPlayer(player);
  };

  const handleDragEnd = () => {
    setDraggedPlayer(null);
  };

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
                <ActiveRetiredSelector selectedActiveRetired={selectedActiveRetired as number | null} onSelectActiveRetired={setSelectedActiveRetired as (activeRetired: number | null) => void} players={players} selectedSport={selectedSport} />
                <FilterPlayers 
                  onFilterChange={setFilteredPlayers}
                  players={players}
                  selectedSport={selectedSport}
                  isPlayerInTeam={isPlayerInTeam}
                  selectedNationality={selectedNationality}
                  selectedPosition={selectedPosition}
                  selectedTeam={selectedTeam}
                  selectedActiveRetired={selectedActiveRetired as number | null} 
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
                    onDragStart={() => handleDragStart(player)}
                    onDragEnd={handleDragEnd}
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
            <div className="flex gap-2">
              <button
                onClick={saveTeam}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Save Team
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer relative"
              >
                Load Team
                {savedTeamsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {savedTeamsCount}
                  </span>
                )}
              </button>
              <button
                onClick={resetTeam}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Reset Team
              </button>
            </div>
          </div>
          <div
            className="terrain"
            style={{
              position: "relative",
              width: 1200,
              height: 900,
              background: "url('/images/rugby-field.webp') no-repeat center/cover",
              // background: selectedSport === "rugby"
              //   ? 'url("/images/rugby-field.webp") no-repeat center/cover'
              //   : selectedSport === "football"
              //   ? 'url("/images/foot-field.webp") no-repeat center/cover'
              //   : selectedSport === "basketball"
              //   ? 'url("/images/basket-field.webp") no-repeat center/cover'
              //   : selectedSport === "hockey"
              //   ? 'url("/images/hockey-field.webp") no-repeat center/cover'
              //   : selectedSport === "handball"
              //   ? 'url("/images/handball-field.webp") no-repeat center/cover'
              //   : ""
            }}
          >
            {sportPositions[selectedSport].map((position) => {
              const coords = formationCoordsPixels[selectedSport][position.id];
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
                    draggedPlayer={draggedPlayer}
                    onDragStart={() => {
                      const slotPlayer = team[position.id] as PlayerType | null;
                      if (slotPlayer) handleDragStart(slotPlayer);
                    }}
                    onDragEnd={handleDragEnd}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <SavedTeamsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoadTeam={(teamId) => {
          loadTeam(teamId);
          setIsModalOpen(false);
        }}
        onDeleteTeam={deleteTeam}
      />
    </DndProvider>
  );
}
