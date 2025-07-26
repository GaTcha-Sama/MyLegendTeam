import pandas as pd
import json
import os
from pathlib import Path

def get_sport_folder(sport_id):
    """Retourne le nom du dossier du sport basé sur son ID"""
    sports_mapping = {
        1: "rugby",
        # 3: "football",
        # 2: "basketball",
        # 4: "handball",
        # 5: "hockey"
    }
    return sports_mapping.get(sport_id, "unknown")

def get_flag_path(flag):
    return f"images/flags/{flag}.png"

def clean_filename(text):
    """Nettoie le texte pour un nom de fichier valide"""
    return (
        text.replace("'", "-")
            .replace("'", "-")
            .replace(" ", "-")
            .replace("–", "-")
            .replace("—", "-") 
    )

def get_player_photo_path(name, lastname, flag, sport_id, extension):
    sport_folder = get_sport_folder(sport_id)
    
    # Gestion des cas où il n'y a qu'un nom (comme Ronaldinho)
    if pd.isna(lastname) or str(lastname).strip() == "":
        filename = str(name).strip()
    elif pd.isna(name) or str(name).strip() == "":
        filename = str(lastname).strip()
    else:
        filename = f"{lastname}-{name}"
    
    filename = clean_filename(filename)
    return f"images/{sport_folder}/players/{flag}/{filename}.{extension}"

def import_players():
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    json_output_path = root_dir / 'data' / 'players.json'
    
    players_list = []
    
    sport_files = {
        1: 'rugby_players.ods',
        # 2: 'basketball_players.ods',
        # 3: 'football_players.ods',
        # 4: 'handball_players.ods',
        # 5: 'hockey_players.ods'
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
                # Gestion des team_id avec vérification des NaN
                team1_id = int(row['team1_id']) if pd.notna(row['team1_id']) else None
                team2_id = int(row['team2_id']) if pd.notna(row['team2_id']) else None
                team3_id = int(row['team3_id']) if pd.notna(row['team3_id']) else None

                # Gestion des noms/prénoms avec vérification des NaN
                name = str(row['name']).strip() if pd.notna(row['name']) else ""
                lastname = str(row['lastname']).strip() if pd.notna(row['lastname']) else ""

                player = {
                    "id": int(row['id']),
                    "name": name,
                    "lastname": lastname,
                    "nationality_id": int(row['nationality_id']),
                    "position_id": int(row['position_id']),
                    "sport_id": sport_id,
                    "team1_id": team1_id,
                    "team2_id": team2_id,
                    "team3_id": team3_id,
                    "flag": get_flag_path(row['flag']),
                    "active": int(row['active']) == 1,
                    "photo": get_player_photo_path(
                        name,
                        lastname,
                        row['flag'],
                        sport_id,
                        row['extension']
                    )
                }
                players_list.append(player)
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
