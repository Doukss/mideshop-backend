# MediShop - API Todo List

API backend CRUD pour la gestion de tâches (Todo List) destinée aux équipes internes de **MediShop**.

## Stack technique

- **Node.js** / **Express.js**
- **PostgreSQL** (via `pg`, sans ORM) pour le stockage des données
- **Swagger** (swagger-jsdoc + swagger-ui-express) pour la documentation interactive

## Structure du projet

```
mediShop-todo-backend/
├── db/
│   ├── schema.sql            # Schéma SQL de la table todos
│   └── migrate.js            # Script d'exécution du schéma
├── src/
│   ├── config/
│   │   ├── db.js             # Pool de connexion PostgreSQL
│   │   └── swagger.js        # Configuration Swagger
│   ├── controllers/
│   │   └── todoController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── todoModel.js      # Requêtes SQL (CRUD)
│   ├── routes/
│   │   └── todoRoutes.js     # Routes + annotations Swagger
│   └── app.js                # Configuration de l'application Express
├── .env.example
├── .gitignore
├── package.json
├── server.js                 # Point d'entrée
└── README.md
```

## Prérequis

- Node.js 18+
- Une instance **PostgreSQL** accessible (locale ou hébergée)

## Installation

1. Ouvrir le dossier dans VS Code.
2. Installer les dépendances :

```bash
npm install
```

3. Créer le fichier `.env` à partir de l'exemple fourni :

```bash
cp .env.example .env
```

4. Renseigner les identifiants de connexion PostgreSQL dans `.env` :

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medishop_todo
DB_USER=postgres
DB_PASSWORD=postgres
DB_SSL=false
```

> Alternative : renseigner une seule variable `DATABASE_URL` (pratique pour les bases hébergées type Render, Railway, Supabase, Neon…). Si elle est définie, elle est prioritaire sur les variables individuelles.

5. Créer la base de données (si elle n'existe pas encore) :

```bash
# Depuis un terminal avec psql installé
createdb -U postgres medishop_todo
```

6. Exécuter la migration pour créer la table `todos` :

```bash
npm run db:migrate
```

Ce script exécute `db/schema.sql`, qui crée la table `todos` (et l'extension `pgcrypto` si besoin) de façon idempotente : il peut être relancé sans risque.

## Démarrage

**Mode développement (avec rechargement automatique)** :

```bash
npm run dev
```

**Mode standard** :

```bash
npm start
```

Le serveur démarre par défaut sur : `http://localhost:3000`

## Documentation Swagger

Une fois le serveur démarré, la documentation interactive est disponible ici :

👉 **http://localhost:3000/api-docs**

Elle permet de tester directement chaque route (GET, POST, PUT, DELETE) depuis le navigateur.

## Endpoints disponibles

| Méthode | Route              | Description                                    |
|---------|---------------------|------------------------------------------------|
| GET     | `/api/todos`         | Liste toutes les tâches (filtre `?statut=`)     |
| GET     | `/api/todos/:id`      | Récupère une tâche par son id                  |
| POST    | `/api/todos`          | Crée une nouvelle tâche                        |
| PUT     | `/api/todos/:id`      | Met à jour une tâche existante                 |
| DELETE  | `/api/todos/:id`      | Supprime une tâche                             |

### Modèle de tâche (Todo)

```json
{
  "id": "uuid généré automatiquement",
  "titre": "Préparer la réunion d'équipe",
  "description": "Préparer les slides et l'ordre du jour",
  "statut": "a_faire",
  "dateCreation": "2026-07-05T10:00:00.000Z",
  "dateMiseAJour": "2026-07-05T10:00:00.000Z"
}
```

Statuts possibles : `a_faire`, `en_cours`, `terminee`.

### Exemple de requête POST

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"titre": "Préparer la réunion d équipe", "description": "Slides + ordre du jour", "statut": "a_faire"}'
```

## Dépannage

- **`ECONNREFUSED` au démarrage** : PostgreSQL n'est pas démarré, ou les identifiants dans `.env` sont incorrects.
- **`relation "todos" does not exist`** : la migration n'a pas encore été exécutée → `npm run db:migrate`.
- **`password authentication failed`** : vérifier `DB_USER` / `DB_PASSWORD` dans `.env`, ou l'authentification configurée dans `pg_hba.conf`.

## Évolutions possibles

- Ajouter l'authentification des utilisateurs (JWT)
- Ajouter la pagination et le tri sur `GET /api/todos`
- Ajouter des tests automatisés (Jest + Supertest)
- Passer à un ORM (Prisma, Sequelize) si le schéma se complexifie
