// src/routes/user.routes.ts
import { Router } from 'express';
// Importe TOUTES les fonctions du contrôleur
import {
  getUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';

const router = Router();

// Route GET /users -> Récupère tous les utilisateurs
router.get('/', getUsers);

// Route POST /users -> Ajoute un nouvel utilisateur
router.post('/', addUser);

// Route GET /users/:id -> Récupère un utilisateur spécifique 
router.get('/:id', getUserById);

// Route PUT /users/:id -> Met à jour un utilisateur 
router.put('/:id', updateUser);

// Route DELETE /users/:id -> Supprime un utilisateur 
router.delete('/:id', deleteUser);

export default router;