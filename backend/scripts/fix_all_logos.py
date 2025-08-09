import json
import os
from pathlib import Path

def fix_all_logos():
    """Corrige tous les chemins de logos d'équipes dans teams.json"""
    script_dir = Path(__file__).parent
    teams_file = script_dir.parent / 'data' / 'teams.json'
    
    # Lire le fichier JSON
    with open(teams_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Corriger les chemins
    fixed_count = 0
    for team in data['teams']:
        original_logo = team['team_logo']
        
        # Supprimer le préfixe 'public/' s'il existe
        if original_logo.startswith('public/'):
            team['team_logo'] = original_logo.replace('public/', '')
            fixed_count += 1
        
        # Corriger le chemin pour qu'il commence par 'images/rugby/teams/'
        if 'rugby/teams/' in original_logo and not original_logo.startswith('images/rugby/teams/'):
            # Extraire la partie après 'teams/'
            parts = original_logo.split('teams/')
            if len(parts) > 1:
                team['team_logo'] = f'images/rugby/teams/{parts[-1]}'
                fixed_count += 1
        
        # Convertir .png en .webp
        if team['team_logo'].endswith('.png'):
            team['team_logo'] = team['team_logo'].replace('.png', '.webp')
            fixed_count += 1
    
    # Sauvegarder le fichier corrigé
    with open(teams_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ {fixed_count} corrections apportées aux logos d'équipes")
    print("📝 Fichier teams.json mis à jour")

if __name__ == "__main__":
    fix_all_logos()
