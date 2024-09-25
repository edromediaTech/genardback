const Rendement = require('../models/rendement');

// Ajouter un rendement
exports.createRendement = async (req, res) => {
    try {
        const rendement = new Rendement(req.body);
        await rendement.save();
        res.status(201).json(rendement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un rendement
exports.updateRendement = async (req, res) => {
    try {
        const rendement = await Rendement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(rendement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un rendement
exports.deleteRendement = async (req, res) => {
    try {
        await Rendement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Rendement supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Récupérer un rendement
exports.getRendement = async (req, res) => {
    try {
        const rendement = await Rendement.findById(req.params.id).populate('investissement');
        res.status(200).json(rendement);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
