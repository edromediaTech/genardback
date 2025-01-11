const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

module.exports = (io) => {
  // Route pour la création de compte (signup)
  router.post('/signup', userCtrl.signUp);

  // Route pour la connexion (login) avec gestion de Socket.IO
  router.post('/login', (req, res) => userCtrl.login(req, res, io));

  // Autres routes
  router.get('/all', userCtrl.getAllUser);
  router.get('/all1', userCtrl.getAllUserInv);
  router.get('/:id', auth, userCtrl.getUser);
  
  router.patch('/userlevel/:id', auth, userCtrl.updateUserLevel);
  router.patch('/:id', auth, userCtrl.updateUser);
  router.patch('/code/:id', auth, userCtrl.updateUserCode);


  router.delete('/logout', userCtrl.logout);
  router.delete('/:id', auth, userCtrl.deleteUser);

  // Retourner le router après avoir défini toutes les routes
  return router;
};
