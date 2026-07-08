# Image de base légère avec Node.js 20
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# On copie d'abord uniquement les fichiers de dépendances
# (permet à Docker de mettre en cache "npm install" si le code change mais pas les deps)
COPY package*.json ./

RUN npm install --omit=dev

# On copie le reste du code applicatif
COPY . .

# Port exposé par l'API Express
EXPOSE 3000

# Commande de démarrage du conteneur
CMD ["node", "server.js"]