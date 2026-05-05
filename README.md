# Capitainerie API – Express / MongoDB

Application backend complète permettant la gestion d’une capitainerie :
catways, réservations et utilisateurs.

Ce projet a été réalisé dans le cadre d’un exercice CEF avec une approche professionnelle :
API REST sécurisée, tests automatisés, frontend EJS et documentation complète.


## Fonctionnalités

### Catways
- Créer un catway
- Lister les catways
- Récupérer un catway
- Modifier l’état d’un catway
- Supprimer un catway

### Réservations
- Créer une réservation
- Lister les réservations
- Voir les détails d’une réservation
- Supprimer une réservation
- Vérification des conflits de dates

### Utilisateurs
- Créer un utilisateur
- Modifier un utilisateur
- Supprimer un utilisateur


## 🔐 Sécurité

- Authentification via JWT
- Routes sensibles protégées (création / modification / suppression)
- Middleware de vérification du token


## 🧪 Tests automatisés

- 9 fonctionnalités testées avec **Mocha + Supertest**
- Tests exécutés automatiquement au lancement :

```bash
npm start



## Frontend (EJS)

Interface réalisée avec EJS :

Page d’accueil avec formulaire de connexion
Dashboard complet avec formulaires : utilisateurs, catways et réservations
Pages disponibles :
- liste des catways
- liste des réservations
- détail d’un catway
- détail d’une réservation
- documentation API

## Documentation API (EJS)

Accessible via /documentation

## Documentation JSDoc

- générer la doc : npm run docs
- oouvrir docs/index.html

## Installation du projet : 

- git clone https://github.com/HC-VP/russel-harbour-api
- cd russel-API
- npm install

créer un fichier .env : 
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

## Lancer le projet :

Mode développement : 
 - npm run dev
Mode production (avec tests)
 -npm start

## Architecture

controllers/  ==> gestion HTTP
services/     ==> logique métier
models/       
routes/       ==> endpoints API + routes EJS
views/        ==> frontend EJS
tests/
docs/


## choix techniques

Express.js
MongoDB / Mongoose
JWT pour la sécurité
Mocha / Supertest pour les tests
EJS pour le frontend
JSDoc pour la documentation

Note :
Le frontend EJS appelle directement les services pour simplifier l’architecture.
La sécurisation complète est assurée au niveau de l’API via JWT.