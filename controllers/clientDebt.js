const ClientDebt = require('../models/clientDebt');

// Créer une créance client
exports.createClientDebt = async (req, res) => {
  try {
    const { client, amount, dueDate, description } = req.body;
    const debt = new ClientDebt({ client, amount, dueDate, description });
    await debt.save();
    res.status(201).json({ message: 'Créance client créée avec succès', debt });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la créance client', error });
  }
};

// Récupérer toutes les créances clients
exports.getClientDebts = async (req, res) => {
  try {
    const debts = await ClientDebt.find().populate('client');
    res.status(200).json({ message: 'Créances clients récupérées avec succès', debts });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des créances clients', error });
  }
};

// Mettre à jour une créance client
exports.updateClientDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const { client, amount, dueDate, status, description } = req.body;
    const updatedDebt = await ClientDebt.findByIdAndUpdate(
      id,
      { client, amount, dueDate, status, description },
      { new: true }
    ).populate('client');
    if (!updatedDebt) return res.status(404).json({ message: 'Créance client non trouvée' });
    res.status(200).json({ message: 'Créance client mise à jour avec succès', updatedDebt });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la créance client', error });
  }
};

// Supprimer une créance client
exports.deleteClientDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDebt = await ClientDebt.findByIdAndDelete(id);
    if (!deletedDebt) return res.status(404).json({ message: 'Créance client non trouvée' });
    res.status(200).json({ message: 'Créance client supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la créance client', error });
  }
};