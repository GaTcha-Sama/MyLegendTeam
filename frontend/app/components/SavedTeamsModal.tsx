import { useState, useEffect } from 'react';
import { SavedTeam } from '../types/savedTeam';

interface SavedTeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadTeam: (teamId: string) => void;
  onDeleteTeam: (teamId: string) => void;
}

export const SavedTeamsModal = ({ isOpen, onClose, onLoadTeam, onDeleteTeam }: SavedTeamsModalProps) => {
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);

  useEffect(() => {
    if (isOpen) {
      const teams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
      setSavedTeams(teams);
    }
  }, [isOpen]);

  const handleDeleteTeam = (teamId: string) => {
    const updatedTeams = savedTeams.filter(team => team.id !== teamId);
    localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));
    setSavedTeams(updatedTeams);
    onDeleteTeam(teamId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black font-[family-name:var(--font-title)]">Saved Teams</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer font-[family-name:var(--font-title)]"
          >
            ×
          </button>
        </div>
        
        {savedTeams.length === 0 ? (
          <p className="text-gray-500 text-center py-8 font-[family-name:var(--font-title)]">No saved team</p>
        ) : (
          <div className="space-y-3">
            {savedTeams.map((team) => (
              <div key={team.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 font-[family-name:var(--font-title)]">
                <div>
                  <h3 className="font-semibold text-black font-[family-name:var(--font-title)]">{team.name}</h3>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-title)]">
                    {team.sport} • {new Date(team.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-xs text-gray-500 font-[family-name:var(--font-title)]">
                    {Object.values(team.players).filter(player => player !== null).length} players
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onLoadTeam(team.id)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors cursor-pointer font-[family-name:var(--font-title)]"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors cursor-pointer font-[family-name:var(--font-title)]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 