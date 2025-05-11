import pandas as pd
import json
import os
from pathlib import Path

def get_sport_folder(sport_id):
    """Retourne le nom du dossier du sport basé sur son ID"""
    sports_mapping = {
        1: "rugby",
        2: "football",
        3: "basketball",
        4: "handball",
        5: "hockey"
    }
    return sports_mapping.get(sport_id, "unknown")

def get_flag_path(flag):
    return f"public/images/flags/{flag}.png"

def clean_filename(text):
    """Nettoie le texte pour un nom de fichier valide"""
    return (
        text.replace("'", "-")
            .replace("’", "-")
            .replace(" ", "-")
            .replace("–", "-")  # tiret long éventuel
            .replace("—", "-")  # tiret cadratin éventuel
    )

def get_player_photo_path(name, lastname, flag, sport_id, extension):
    sport_folder = get_sport_folder(sport_id)
    # On concatène d'abord, puis on nettoie le tout pour gérer tous les cas
    filename = f"{lastname}-{name}"
    filename = clean_filename(filename)
    return f"public/images/{sport_folder}/players/{flag}/{filename}.{extension}"

def import_players():
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    json_output_path = root_dir / 'data' / 'players.json'
    
    players_list = []
    current_id = 1  # Pour gérer automatiquement les IDs
    
    sport_files = {
        1: 'rugby_players.ods',
        2: 'football_players.ods',
        3: 'basketball_players.ods',
        4: 'handball_players.ods',
        5: 'hockey_players.ods'
    }
    
    for sport_id, filename in sport_files.items():
        excel_path = script_dir / filename
        if not excel_path.exists():
            print(f"Fichier {filename} non trouvé, passage au suivant")
            continue
            
        print(f"Traitement du fichier {filename}")
        df = pd.read_excel(excel_path, engine='odf')
        
        for index, row in df.iterrows():
            try:
                player = {
                    "id": current_id,
                    "name": str(row['name']).strip(), 
                    "lastname": str(row['lastname']).strip(),
                    "nationality_id": int(row['nationality_id']),
                    "position_id": int(row['position_id']),
                    "sport_id": sport_id,
                    "team_id": int(row['team_id']),
                    "flag": get_flag_path(row['flag']),
                    "photo": get_player_photo_path(
                        row['name'].strip(),
                        row['lastname'].strip(),
                        row['flag'],
                        sport_id,
                        row['extension']
                    )
                }
                players_list.append(player)
                current_id += 1  # Incrémentation de l'ID pour le prochain joueur
            except Exception as e:
                print(f"Erreur dans {filename} à la ligne {index + 2} :")
                print(f"Données de la ligne : {row.to_dict()}")
                print(f"Erreur : {str(e)}")
                raise
    
    json_data = {"players": players_list}
    
    os.makedirs(os.path.dirname(json_output_path), exist_ok=True)
    
    with open(json_output_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)
    
    print(f"Import terminé ! {len(players_list)} joueurs ont été importés.")
    print(f"Fichier JSON créé : {json_output_path}")

if __name__ == "__main__":
    import_players()
