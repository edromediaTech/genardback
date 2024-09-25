const Document = require('../models/document');

// Ajouter un document
exports.createDocument = async (req, res) => {
    try {
        const document = new Document(req.body);
        await document.save();
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un document
exports.updateDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un document
exports.deleteDocument = async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Document supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer un document
exports.getDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id).populate('proprietaire');
        res.status(200).json(document);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
