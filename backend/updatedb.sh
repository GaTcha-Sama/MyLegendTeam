#!/bin/sh

echo "Import python-excel des joueurs"
python scripts/import_players.py

echo "Init nouvelle base de données"
node database/init.js
