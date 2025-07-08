1. Installer Docker Desktop
Télécharger Docker Desktop depuis https://www.docker.com/products/docker-desktop/
Installer et redémarrer l'ordinateur
S'assurer que Docker Desktop est démarré (icône dans la barre des tâches)

2. Récupérer le projet

Sur bash :
=> git clone https://github.com/GaTcha-Sama/MyLegendTeam.git
=> cd mylegendteam
=> git checkout docker
=> git pull origin docker

Sur powershell ou cmd-prompt :
=> cd mylegendteam

3. Lancer l'application
# Sur Windows (PowerShell ou CMD)
=> docker-compose up --build 
OU start.bat sinon (pas testé encore)
# Ou utiliser le script batch
=> start.bat

Installation des dépendances si problème lors du docker-compose :
=> cd frontend
=> npm install
=> npm run dev
=> cd ..
=> cd backend 
=> npm install
=> npm run dev

4. Accéder à l'application
Ouvrir un navigateur
Aller sur : http://localhost:3000 pour le frontend
Aller sur : http://localhost:5000 pour le backend

🔧 En cas de problème
Docker fonctionne-t-il ?
docker --version
docker-compose --version
vider le cache du navigateur
Arrêtez tous les conteneurs : docker-compose down
Nettoyez le cache : docker system prune -a --volumes
Redémarrez Docker Desktop (si applicable)
Reconstruisez : docker-compose build --no-cache
Relancez : docker-compose up

Les ports sont-ils libres ?
Vérifier qu'aucune autre application n'utilise les ports 3000 et 5000
Logs d'erreur :
docker-compose logs

Commandes utiles :
# Arrêter l'application
docker-compose down

# Redémarrer
docker-compose restart

# Voir les logs en temps réel
docker-compose logs -f

# Nettoyer complètement
docker-compose down -v
docker system prune -a
