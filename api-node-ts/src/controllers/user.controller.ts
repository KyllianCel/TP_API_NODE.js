// src/controllers/user.controller.ts
import { Request, Response } from 'express';
// Importe notre connexion à la DB
import { db } from '../db/database';

/*
 * Note sur les fonctions :
 * On utilise function(err) { ... } au lieu de (err) => { ... }
 * pour les callbacks de db.run(), car cela nous donne accès à
 * 'this.lastID' (pour POST) et 'this.changes' (pour PUT/DELETE).
 */

// POST /users 
// Ajoute un utilisateur
export const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nom et email requis" });
  }

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

  db.run(sql, [name, email], function (err) {
    if (err) {
      // Gère les erreurs (ex: email déjà utilisé "UNIQUE constraint failed")
      return res.status(500).json({ message: "Erreur lors de l'ajout", error: err.message });
    }
    // 'this.lastID' est l'ID auto-incrémenté de l'utilisateur qui vient d'être créé
    res.status(201).json({
      message: `Utilisateur ${name} ajouté avec succès!`,
      userId: this.lastID,
    });
  });
};

// GET /users 
// Récupère tous les utilisateurs
export const getUsers = (req: Request, res: Response) => {
  const sql = "SELECT * FROM users";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erreur DB", error: err.message });
    }
    res.json({ users: rows });
  });
};

// GET /users/:id 
// Récupère un utilisateur spécifique
export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Erreur DB", error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ user: row });
  });
};

// PUT /users/:id 
// Met à jour un utilisateur
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nom et email requis" });
  }

  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";

  db.run(sql, [name, email, id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
    }
    // 'this.changes' indique combien de lignes ont été modifiées
    if (this.changes === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: `Utilisateur ${id} mis à jour.` });
  });
};

// DELETE /users/:id 
// Supprime un utilisateur
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: `Utilisateur ${id} supprimé.` });
  });
};