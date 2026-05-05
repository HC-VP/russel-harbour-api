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


## Sécurité

- Authentification via JWT
- Routes sensibles protégées (création / modification / suppression)
- Middleware de vérification du token


## Tests automatisés

- 9 fonctionnalités testées avec **Mocha + Supertest**
- Tests exécutés automatiquement au lancement :

```bash
npm start
```

## Frontend (EJS)

Interface réalisée avec EJS :

-Page d’accueil avec formulaire de connexion

-Dashboard complet avec formulaires : utilisateurs, catways et réservations

-Pages disponibles :
    - liste des catways
    - liste des réservations
    - détail d’un catway
    - détail d’une réservation
    - documentation API

## Documentation API (EJS)

Accessible via /documentation

## Documentation API (Swagger)

Une documentation interactive de l’API est disponible :

http://localhost:3001/api-docs

Elle permet de tester directement les routes avec authentification JWT.

## Documentation JSDoc

- générer la doc : npm run docs
- ouvrir docs/index.html

## Installation du projet : 

```bash
git clone https://github.com/HC-VP/russel-harbour-api
cd russel-harbour-api
npm install
```

Créer un fichier `.env` :

```env
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

## Lancer le projet :

Mode développement : 
 - npm run dev
Mode production (avec tests)
 -npm start

##Admin User :

Un premier utilisateur administrateur doit être créé avec le script seedAdmin.js.

```bash
node seedAdmin.js
```

Cet utilisateur permet de se connecter à l'application et d'accéder au tableau de bord.

```env
Email : admin@test.com
Mot de passe : test1234
```
Le mot de passe est automatiquement hashé avec bcrypt avant d’être enregistré en base.

Depuis le tableau de bord, il est ensuite possible de créer d'autres utilisateurs via le formulaire prévu à cet effet.

## Architecture

- controllers/ → gestion HTTP
- services/ → logique métier
- models/
- routes/
- views/ → frontend EJS
- tests/
- docs/


## Choix techniques

- Express.js
- MongoDB / Mongoose
- JWT pour la sécurité
- Mocha / Supertest pour les tests
- EJS pour le frontend
- JSDoc pour la documentation

Note :
Le frontend EJS appelle directement les services pour simplifier l’architecture.
La sécurisation complète est assurée au niveau de l’API via JWT.