"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SavedTeam } from '../../types/savedTeam';
import { Player as PlayerType } from '../../types/players';
import { fetchPlayers } from '../../../lib/api';
import { sportThemes, sportPositions, Sport } from '../../types/sports';
import { formationCoordsPixels } from '../../styles/formationCoordsPixels';
import { FormationSlot } from '../../components/FormationSlot';

export default function SharedTeamPageClient() {
  const params = useParams();
  const teamId = params?.id as string;
  const [team, setTeam] = useState<SavedTeam | null>(null);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamPlayers, setTeamPlayers] = useState<{ [key: string]: PlayerType | null }>({});

  useEffect(() => {
    const loadTeam = () => {
      try {
        // Récupérer depuis localStorage uniquement
        // Les données complètes ne sont plus dans l'URL pour éviter l'erreur 431
        const savedTeams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
        const foundTeam = savedTeams.find((t: SavedTeam) => t.id === teamId);
        
        if (foundTeam) {
          setTeam(foundTeam);
        }
        // Si l'équipe n'est pas trouvée dans localStorage, elle sera affichée comme "non trouvée"
        // Cela signifie que l'utilisateur doit avoir l'équipe sauvegardée dans son navigateur
      } catch (error) {
        console.error('Erreur lors du chargement de l\'équipe:', error);
      }
    };

    const loadPlayers = async () => {
      try {
        const playersData = await fetchPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error("Erreur lors du chargement des joueurs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
    loadPlayers();
  }, [teamId]);

  useEffect(() => {
    if (team && players.length > 0) {
      // Reconstruire l'objet team avec les données complètes des joueurs
      const fullTeamPlayers: { [key: string]: PlayerType | null } = {};
      Object.entries(team.players).forEach(([position, playerData]) => {
        if (playerData) {
          const fullPlayer = players.find(p => p.id === playerData.id);
          fullTeamPlayers[position] = fullPlayer || null;
        } else {
          fullTeamPlayers[position] = null;
        }
      });
      setTeamPlayers(fullTeamPlayers);
    }
  }, [team, players]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191713] flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-[#191713] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-white text-xl mb-4 font-[family-name:var(--font-title)]">
            Équipe non trouvée
          </div>
          <p className="text-gray-400 text-sm font-[family-name:var(--font-title)]">
            Cette équipe doit être sauvegardée dans votre navigateur pour être affichée.
            <br />
            Si vous avez partagé cette équipe, le destinataire doit également l&apos;avoir sauvegardée.
          </p>
        </div>
      </div>
    );
  }

  const currentTheme = sportThemes[team.sport.toLowerCase() as Sport];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#191713] py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-center mb-2 font-[family-name:var(--font-title)] text-black">
              {team.name}
            </h1>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div
              className="relative mx-auto"
              style={{
                width: 1200,
                height: 900,
                backgroundImage: `url('/images/${team.sport === 'basketball' ? 'basket' : team.sport === 'football' ? 'foot' : team.sport}-field.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Label "Substitutes" pour les remplaçants de gauche */}
              {team.sport === 'rugby' && (
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    left: -100,
                    zIndex: 3,
                  }}
                  className="text-black font-bold text-lg font-[family-name:var(--font-title)] whitespace-nowrap"
                >
                  Substitutes
                </div>
              )}
              
              {/* Label "Substitutes" pour les remplaçants de droite */}
              {team.sport === 'rugby' && (
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    left: 1200,
                    zIndex: 3,
                  }}
                  className="text-black font-bold text-lg font-[family-name:var(--font-title)] whitespace-nowrap"
                >
                  Substitutes
                </div>
              )}
              
              {sportPositions[team.sport as Sport]?.map((position) => {
                const coords = formationCoordsPixels[team.sport as Sport]?.[position.id];
                if (!coords) return null;
                
                // Écarter les remplaçants : 4 à gauche plus à gauche, 4 à droite plus à droite
                let adjustedLeft = coords.left;
                const adjustedTop = coords.top;
                
                if (team.sport === 'rugby') {
                  if (position.id.startsWith('rugby_substitute')) {
                    const subNumber = parseInt(position.id.replace('rugby_substitute', ''));
                    if (subNumber <= 4) {
                      // 4 premiers remplaçants à gauche : les écarter vers la gauche
                      adjustedLeft = coords.left - 150; // Écarter de 150px vers la gauche
                    } else {
                      // 4 derniers remplaçants à droite : les écarter vers la droite
                      adjustedLeft = coords.left + 150; // Écarter de 150px vers la droite
                    }
                  }
                }
                
                return (
                  <div
                    key={position.id}
                    style={{
                      position: "absolute",
                      top: adjustedTop,
                      left: adjustedLeft,
                      width: 60,
                      height: 60,
                      zIndex: 2,
                    }}
                  >
                    <FormationSlot
                      position={position.name}
                      positionId={position.id}
                      player={teamPlayers[position.id] || null}
                      onDropPlayer={() => {}}
                      isPlayerAlreadyPlaced={false}
                      theme={currentTheme}
                      sport={team.sport as Sport}
                      enforceLegendaryLimit={false}
                      team={teamPlayers}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

