import React, { useState, useEffect } from 'react';
import { Player } from '../data/players';

interface FilterPlayersProps {
  onFilterChange: (filteredPlayers: Player[]) => void;
  players: Player[];
  selectedSport: string;
  isPlayerInTeam: (playerId: number) => boolean;
  selectedNationality: string;
  selectedPosition: string;
  selectedTeam: string;
}

export const FilterPlayers = ({ 
  onFilterChange, 
  players, 
  selectedSport,
  isPlayerInTeam,
  selectedNationality,
  selectedPosition,
  selectedTeam
}: FilterPlayersProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchWords = searchTerm.toLowerCase().split(' ').filter(word => word.length > 0);

    const filteredPlayers = players.filter(player => {
      const baseConditions = 
        player.sport.toLowerCase() === selectedSport && 
        !isPlayerInTeam(player.id) &&
        (selectedNationality === "" || player.nationality === selectedNationality) &&
        (selectedPosition === "" || player.position === selectedPosition) &&
        (selectedTeam === "" || player.team === selectedTeam);

      if (searchWords.length === 0) {
        return baseConditions;
      }

      const matchesSearch = searchWords.every(word => 
        player.name.toLowerCase().includes(word) ||
        player.lastname.toLowerCase().includes(word)
      );

      return baseConditions && matchesSearch;
    });

    onFilterChange(filteredPlayers);
  }, [players, selectedSport, isPlayerInTeam, selectedNationality, selectedPosition, selectedTeam, searchTerm, onFilterChange]);

  const resetSearch = () => {
    setSearchTerm('');
  };

  const showNoResults = searchTerm.length >= 3 && players.filter(player => {
    const searchWords = searchTerm.toLowerCase().split(' ').filter(word => word.length > 0);
    const baseConditions = 
      player.sport.toLowerCase() === selectedSport && 
      !isPlayerInTeam(player.id) &&
      (selectedNationality === "" || player.nationality === selectedNationality) &&
      (selectedPosition === "" || player.position === selectedPosition);

    const matchesSearch = searchWords.every(word => 
      player.name.toLowerCase().includes(word) ||
      player.lastname.toLowerCase().includes(word)
    );

    return baseConditions && matchesSearch;
  }).length === 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by name or firstname..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-64 pr-10"
        />
        {searchTerm && (
          <button
            onClick={resetSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-red-100"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
      {showNoResults && (
        <p className="text-red-500 text-sm">Sorry this player is not found</p>
      )}
    </div>
  );
};
