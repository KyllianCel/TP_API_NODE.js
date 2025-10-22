// src/db/database.ts
import sqlite3 from 'sqlite3';

// Active le mode verbeux pour avoir plus d'infos en cas de problème
const verboseSqlite = sqlite3.verbose();

// Le fichier de la base de données (sera créé s'il n'existe pas)
const DB_PATH = './database.sqlite';

// Ouvre la connexion à la base de données
export const db = new verboseSqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }

  console.log('Connecté à la base de données SQLite.');

  // Commande SQL pour créer la table 'users' si elle n'existe pas
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `;

  // Exécute la commande de création
  db.run(createTableSql, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table 'users' prête.");
    }
  });
});