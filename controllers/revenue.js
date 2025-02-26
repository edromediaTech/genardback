const Revenue = require('../models/revenue');

// Créer un revenu
exports.createRevenue = async (req, res) => {
  try {
    const { source, amount, description, booking } = req.body;
    const revenue = new Revenue({ source, amount, description, booking });
    await revenue.save();
    res.status(201).json({ message: 'Revenu créé avec succès', revenue });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du revenu', error });
  }
};

// Récupérer tous les revenus
exports.getRevenues = async (req, res) => {
  try {
    const revenues = await Revenue.find().populate('booking');
    res.status(200).json({ message: 'Revenus récupérés avec succès', revenues });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des revenus', error });
  }
};

// Mettre à jour un revenu
exports.updateRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { source, amount, description, booking } = req.body;
    const updatedRevenue = await Revenue.findByIdAndUpdate(
      id,
      { source, amount, description, booking },
      { new: true }
    ).populate('booking');
    if (!updatedRevenue) return res.status(404).json({ message: 'Revenu non trouvé' });
    res.status(200).json({ message: 'Revenu mis à jour avec succès', updatedRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du revenu', error });
  }
};

// Supprimer un revenu
exports.deleteRevenue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRevenue = await Revenue.findByIdAndDelete(id);
    if (!deletedRevenue) return res.status(404).json({ message: 'Revenu non trouvé' });
    res.status(200).json({ message: 'Revenu supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du revenu', error });
  }
};