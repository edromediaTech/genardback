const Transaction = require('../models/transaction');

// Ajouter une transaction
exports.createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour une transaction
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer une transaction
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Transaction supprimée' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer une transaction
exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('investisseur');
        res.status(200).json(transaction);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
