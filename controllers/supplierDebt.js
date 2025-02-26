const SupplierDebt = require('../models/supplierDebt');

// Créer une dette fournisseur
exports.createSupplierDebt = async (req, res) => {
  try {
    const { supplier, amount, dueDate, description } = req.body;
    const debt = new SupplierDebt({ supplier, amount, dueDate, description });
    await debt.save();
    res.status(201).json({ message: 'Dette fournisseur créée avec succès', debt });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la dette fournisseur', error });
  }
};

// Récupérer toutes les dettes fournisseurs
exports.getSupplierDebts = async (req, res) => {
  try {
    const debts = await SupplierDebt.find().populate('supplier');
    res.status(200).json({ message: 'Dettes fournisseurs récupérées avec succès', debts });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des dettes fournisseurs', error });
  }
};

// Mettre à jour une dette fournisseur
exports.updateSupplierDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier, amount, dueDate, status, description } = req.body;
    const updatedDebt = await SupplierDebt.findByIdAndUpdate(
      id,
      { supplier, amount, dueDate, status, description },
      { new: true }
    ).populate('supplier');
    if (!updatedDebt) return res.status(404).json({ message: 'Dette fournisseur non trouvée' });
    res.status(200).json({ message: 'Dette fournisseur mise à jour avec succès', updatedDebt });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la dette fournisseur', error });
  }
};

// Supprimer une dette fournisseur
exports.deleteSupplierDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDebt = await SupplierDebt.findByIdAndDelete(id);
    if (!deletedDebt) return res.status(404).json({ message: 'Dette fournisseur non trouvée' });
    res.status(200).json({ message: 'Dette fournisseur supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la dette fournisseur', error });
  }
};