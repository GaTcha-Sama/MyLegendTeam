'use client';

import { useState, useEffect } from 'react';
import { Sport, sportPositions } from '../types/sports';
import axios from 'axios';

// On omet l'ID car il sera géré par le backend
interface FormData {
  name: string;
  lastname: string;
  nationality: string;
  flag: string;
  sport: Sport;
  position: string;
  photo: string;
  team: string;
  team_logo: string;
}

const API_BASE_URL = "http://localhost:5001";

export default function AdminPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    nationality: '',
    flag: '',
    sport: 'rugby',
    position: '',
    photo: '',
    team: '',
    team_logo: ''
  });

  const [positions, setPositions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    setPositions(sportPositions[formData.sport]);
    setFormData(prev => ({ ...prev, position: '' }));
  }, [formData.sport]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitFormData = new FormData();
    
    // Ajout de tous les champs au FormData
    Object.entries(formData).forEach(([key, value]) => {
      submitFormData.append(key, value);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/players`, submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Joueur ajouté avec succès !');
        setFormData({
          name: '',
          lastname: '',
          nationality: '',
          flag: '',
          sport: 'rugby',
          position: '',
          photo: '',
          team: '',
          team_logo: ''
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout du joueur');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'photo' | 'flag' | 'team_logo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setFormData(prev => ({
        ...prev,
        [field]: response.data.path
      }));
    } catch (error) {
      console.error('Erreur détaillée lors du téléchargement:', error);
      if (axios.isAxiosError(error)) {
        console.error('Statut de la réponse:', error.response?.status);
        console.error('Données de la réponse:', error.response?.data);
        alert(`Erreur lors du téléchargement: ${error.response?.data?.message || 'Erreur inconnue'}`);
      } else {
        alert('Erreur lors du téléchargement du fichier');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Ajouter un nouveau joueur</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-2">Prénom</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              placeholder="Entrez le prénom"
              required
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-black mb-2">Nom</label>
            <input
              id="lastname"
              type="text"
              value={formData.lastname}
              onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              placeholder="Entrez le nom"
              required
            />
          </div>

          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-black mb-2">Sport</label>
            <select
              id="sport"
              value={formData.sport}
              onChange={(e) => setFormData(prev => ({ ...prev, sport: e.target.value as Sport }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            >
              {Object.keys(sportPositions).map((sport) => (
                <option key={sport} value={sport}>
                  {sport.charAt(0).toUpperCase() + sport.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-black mb-2">Position</label>
            <select
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            >
              <option value="">Sélectionner une position</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.name}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="team" className="block text-sm font-medium text-black mb-2">Équipe</label>
            <input
              id="team"
              type="text"
              value={formData.team}
              onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-black mb-2">Nationalité</label>
            <input
              id="nationality"
              type="text"
              value={formData.nationality}
              onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-black mb-2">Photo du joueur</label>
            <input
              id="photo"
              type="file"
              accept="image/svg+xml, image/png, image/jpeg, image/jpg, image/webp, image/gif, image/bmp, image/tiff, image/ico, image/heic, image/heif"
              onChange={(e) => handleFileUpload(e, 'photo')}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="flag" className="block text-sm font-medium text-black mb-2">Drapeau</label>
            <input
              id="flag"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'flag')}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            />
          </div>

          <div>
            <label htmlFor="team_logo" className="block text-sm font-medium text-black mb-2">Logo de l&apos;équipe</label>
            <input
              id="team_logo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'team_logo')}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Ajouter le joueur
          </button>
        </div>
      </form>
    </div>
  );
}