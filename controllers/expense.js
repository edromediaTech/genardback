const Expense = require('../models/expense');

// Créer une dépense
exports.createExpense = async (req, res) => {
  try {
    const { date, amount, description, budgetLine, paymentMethod, supplier, devise, achat} = req.body;
    const expense = new Expense({ date, amount, description, budgetLine, paymentMethod, supplier, devise, achat });
    console.log(expense)
    await expense.save();
    res.status(201).json({ message: 'Dépense créée avec succès', expense });
  } catch (error) { console.log(error)
    res.status(500).json({ message: 'Erreur lors de la création de la dépense', error });
  }
};

// Récupérer toutes les dépenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('budgetLine').populate('supplier');
    res.status(200).json({ message: 'Dépenses récupérées avec succès', expenses });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des dépenses', error });
  }
};

// Mettre à jour une dépense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, description, budgetLine, paymentMethod, supplier } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { date, amount, description, budgetLine, paymentMethod, supplier },
      { new: true }
    ).populate('budgetLine').populate('supplier');
    if (!updatedExpense) return res.status(404).json({ message: 'Dépense non trouvée' });
    res.status(200).json({ message: 'Dépense mise à jour avec succès', updatedExpense });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la dépense', error });
  }
};

// Supprimer une dépense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) return res.status(404).json({ message: 'Dépense non trouvée' });
    res.status(200).json({ message: 'Dépense supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la dépense', error });
  }
};

// Fonction pour récupérer les dépenses par période
exports.getExpensesByPeriod = async (req, res) => {
  try {
    const { datedebut, datefin } = req.query;

    // Vérifier si les paramètres existent
    if (!datedebut || !datefin) {
      return res.status(400).json({ message: "Les paramètres datedebut et datefin sont requis." });
    }

    // Convertir en objets Date
    const startDate = new Date(datedebut);
    const endDate = new Date(datefin);

    // Vérifier la validité des dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Format de date invalide." });
    }

    // Rechercher les dépenses entre ces dates
    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate("budgetLine"); // Optionnel : peupler la ligne budgétaire

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};