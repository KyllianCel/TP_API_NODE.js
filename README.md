# TP_API_NODE.js

# Création d'API avec node.js

Ceci est un projet d'exemple pour une API REST basique gérant des utilisateurs (opérations CRUD).

Le serveur est construit avec Node.js, Express, utilise TypeScript pour le typage, et stocke les données dans une base de données SQLite.



## Technologies utilisées

* **Node.js** : Environnement d'exécution JavaScript.
* **Express.js** : Framework web pour Node.js.
* **TypeScript** : Sur-ensemble de JavaScript ajoutant un typage statique.
* **SQLite3** : Base de données SQL légère et basée sur fichiers.
* **ts-node** : Permet d'exécuter directement du TypeScript.
* **nodemon** : Surveille les modifications des fichiers et redémarre le serveur.
* **dotenv** : Charge les variables d'environnement depuis un fichier `.env`.

## Prérequis

* Node.js
* npm (inclus avec Node.js)

## Lancer l'application

Le projet inclut des scripts `npm` pour le développement et la production.

### Mode Développement

En mode développement, `nodemon` surveille vos fichiers TypeScript (`.ts`) et redémarre automatiquement le serveur à chaque modification.

```bash
npm run dev
