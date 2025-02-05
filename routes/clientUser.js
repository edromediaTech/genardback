const express = require('express');
const clientUserController = require('../controllers/clientUser'); // Importez le contrôleur
const router = express.Router();

// 1. Créer un utilisateur
router.post('/', clientUserController.createUser);

// 2. Récupérer tous les utilisateurs
router.get('/', clientUserController.getAllUsers);

// 3. Récupérer un utilisateur par ID
router.get('/:id', clientUserController.getUserById);

// 4. Mettre à jour un utilisateur
router.put('/:id', clientUserController.updateUser);

// 5. Supprimer un utilisateur
router.delete('/:id', clientUserController.deleteUser);

module.exports = router;