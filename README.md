# MyLegendTeam - Guide d'installation et de démarrage

Bienvenue ! Ce guide vous explique comment installer, configurer et lancer le projet **MyLegendTeam** à l'aide de Docker Desktop.

---

## 1. Installer Docker Desktop

- **Téléchargez Docker Desktop** depuis [docker.com](https://www.docker.com/products/docker-desktop/)
- Installez le logiciel puis **redémarrez votre ordinateur**
- Vérifiez que Docker Desktop est bien démarré (icône dans la barre des tâches)

## 2. Récupérer le projet

### Sous bash :
git clone https://github.com/GaTcha-Sama/MyLegendTeam.git
cd mylegendteam
git checkout docker
git pull origin docker

### Sous PowerShell ou CMD :
cd mylegendteam

## 3. Lancer l'application

### Sur Windows (PowerShell ou CMD) :
docker-compose up --build
start.bat *(script batch, pas encore testé)*

### Si un problème survient lors de `docker-compose` (installation des dépendances manuelle) :
cd frontend
npm install
npm run dev
cd ..
cd backend
npm install
npm run dev

text

---

## 4. Accéder à l'application

- Ouvrez votre navigateur :
  - Frontend : [http://localhost:3000](http://localhost:3000)
  - Backend : [http://localhost:5000](http://localhost:5000)

---

## 🔧 En cas de problème

### Vérifications de base

- Docker fonctionne-t-il ?
docker --version
docker-compose --version

text
- Vider le cache du navigateur
- Arrêter tous les conteneurs :
docker-compose down

text
- Nettoyer le cache Docker :
docker system prune -a --volumes

text
- Redémarrer Docker Desktop
- Reconstruire les images :
docker-compose build --no-cache

text
- Relancer :
docker-compose up

text

### Ports

- Vérifier qu'aucune autre application n'utilise les ports **3000** et **5000**

### Logs d'erreur

docker-compose logs

text

---

## Commandes utiles

| Action                        | Commande                                 |
|-------------------------------|------------------------------------------|
| **Arrêter l'application**     | `docker-compose down`                    |
| **Redémarrer**                | `docker-compose restart`                 |
| **Voir les logs en temps réel** | `docker-compose logs -f`                |
| **Nettoyer complètement**     | `docker-compose down -v`<br>`docker system prune -a` |

---

Bon développement ! 🚀
