const express = require('express');
const documentController = require('../controllers/document');
const router = express.Router();

// Routes CRUD Document
router.post('/documents', documentController.createDocument);
router.put('/documents/:id', documentController.updateDocument);
router.delete('/documents/:id', documentController.deleteDocument);
router.get('/documents/:id', documentController.getDocument);

module.exports = router;
