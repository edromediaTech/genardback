const BudgetLine = require('../models/budgetLine');

// Créer une ligne budgétaire
exports.createBudgetLine = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const budgetLine = new BudgetLine({ name, description, category });
    await budgetLine.save();
    res.status(201).json({ message: 'Ligne budgétaire créée avec succès', budgetLine });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la ligne budgétaire', error });
  }
};

// Récupérer toutes les lignes budgétaires
exports.getBudgetLines = async (req, res) => {
  try {
    const budgetLines = await BudgetLine.find();
    res.status(200).json({ message: 'Lignes budgétaires récupérées avec succès', budgetLines });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des lignes budgétaires', error });
  }
};

// Mettre à jour une ligne budgétaire
exports.updateBudgetLine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;
    const updatedBudgetLine = await BudgetLine.findByIdAndUpdate(
      id,
      { name, description, category },
      { new: true }
    );
    if (!updatedBudgetLine) return res.status(404).json({ message: 'Ligne budgétaire non trouvée' });
    res.status(200).json({ message: 'Ligne budgétaire mise à jour avec succès', updatedBudgetLine });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la ligne budgétaire', error });
  }
};

// Supprimer une ligne budgétaire
exports.deleteBudgetLine = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudgetLine = await BudgetLine.findByIdAndDelete(id);
    if (!deletedBudgetLine) return res.status(404).json({ message: 'Ligne budgétaire non trouvée' });
    res.status(200).json({ message: 'Ligne budgétaire supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la ligne budgétaire', error });
  }
};