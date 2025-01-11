const Table = require('../models/table');

// Ajouter une table
exports.createTable = async (req, res) => {
  try {
    const table = new Table(req.body);
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir toutes les tables
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une table par ID
exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ error: 'Table non trouvée' });
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une table
exports.updateTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!table) return res.status(404).json({ error: 'Table non trouvée' });
    res.status(200).json(table);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une table
exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) return res.status(404).json({ error: 'Table non trouvée' });
    res.status(200).json({ message: 'Table supprimée avec succès', table });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
