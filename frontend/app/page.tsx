"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Player } from "./components/Player";
import { FormationSlot } from "./components/FormationSlot";
import { SportSelector } from "./components/SportSelector";
import { players } from "./data/players";
import { Sport, sportThemes, sportPositions } from "./types/sports";
import { Player as PlayerType } from "./data/players";

export default function DreamTeamBuilder() {
  const [team, setTeam] = useState<Record<string, { id: number; name: string } | null>>({});
  const [selectedSport, setSelectedSport] = useState<Sport>("football");

  const handleDropPlayer = (position: string, player: { id: number; name: string } | null) => {
    setTeam((prev) => ({ ...prev, [position]: player }));
  };

  const isPlayerInTeam = (playerId: number) => {
    return Object.values(team).some(player => player?.id === playerId);
  };

  const currentTheme = sportThemes[selectedSport];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Sidebar */}
        <div className="w-1/3 p-6 bg-white rounded-xl shadow-lg mr-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
            Joueurs disponibles
          </h2>
          <SportSelector selectedSport={selectedSport} onSelectSport={setSelectedSport} />
          {players
            .filter(player => player.sport === selectedSport && !isPlayerInTeam(player.id))
            .map((player) => (
              <Player key={player.id} player={player} theme={currentTheme} />
            ))}
        </div>

        {/* Terrain / Composition */}
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
            Mon équipe de légende
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {sportPositions[selectedSport].map((position) => (
              <FormationSlot
                key={position.id}
                position={position.name}
                player={team[position.id] as PlayerType | null}
                onDropPlayer={(_, player) => handleDropPlayer(position.id, player)}
                isPlayerAlreadyPlaced={isPlayerInTeam(team[position.id]?.id || 0)}
                theme={currentTheme}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
