const MonthlyBudget = require('../models/monthlyBudget');

// Créer un budget mensuel
exports.createMonthlyBudget = async (req, res) => {
  try {
    const { month, year, budgetLines } = req.body;
    const monthlyBudget = new MonthlyBudget({ month, year, budgetLines });
    await monthlyBudget.save();
    res.status(201).json({ message: 'Budget mensuel créé avec succès', monthlyBudget });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du budget mensuel', error });
  }
};

// Récupérer tous les budgets mensuels
exports.getMonthlyBudgets = async (req, res) => {
  try {
    const monthlyBudgets = await MonthlyBudget.find().populate('budgetLines.line');
    res.status(200).json({ message: 'Budgets mensuels récupérés avec succès', monthlyBudgets });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des budgets mensuels', error });
  }
};

// Mettre à jour un budget mensuel
exports.updateMonthlyBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, year, budgetLines } = req.body;
    const updatedMonthlyBudget = await MonthlyBudget.findByIdAndUpdate(
      id,
      { month, year, budgetLines },
      { new: true }
    ).populate('budgetLines.line');
    if (!updatedMonthlyBudget) return res.status(404).json({ message: 'Budget mensuel non trouvé' });
    res.status(200).json({ message: 'Budget mensuel mis à jour avec succès', updatedMonthlyBudget });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du budget mensuel', error });
  }
};

// Supprimer un budget mensuel
exports.deleteMonthlyBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMonthlyBudget = await MonthlyBudget.findByIdAndDelete(id);
    if (!deletedMonthlyBudget) return res.status(404).json({ message: 'Budget mensuel non trouvé' });
    res.status(200).json({ message: 'Budget mensuel supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du budget mensuel', error });
  }
};