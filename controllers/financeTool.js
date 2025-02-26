const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Importer les modèles
const BudgetLine = require('../models/budgetLine');
const MonthlyBudget = require('../models/monthlyBudget');
const Expense = require('../models/expense');
const BankAccount = require('../models/bankAccount');
const SupplierDebt = require('../models/supplierDebt');
const ClientDebt = require('../models/clientDebt');
const CashRegister = require('../models/cashRegister');
const Revenue = require('../models/revenue');

// Configurer le transporteur de mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contrôleur pour créer une ligne budgétaire
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

// Comparer les dépenses réelles avec le budget prévu
exports.compareBudgetVsExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;

    // Récupérer le budget mensuel
    const budget = await MonthlyBudget.findOne({ month, year }).populate('budgetLines.line');
    if (!budget) return res.status(404).json({ message: 'Budget mensuel non trouvé' });

    // Récupérer les dépenses pour le mois spécifié
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const expenses = await Expense.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$budgetLine', totalAmount: { $sum: '$amount' } } }
    ]);

    // Fusionner les données
    const result = budget.budgetLines.map(line => {
      const expense = expenses.find(exp => exp._id.equals(line.line._id));
      return {
        line: line.line.name,
        allocatedAmount: line.allocatedAmount,
        spentAmount: expense ? expense.totalAmount : 0,
        remainingAmount: line.allocatedAmount - (expense ? expense.totalAmount : 0)
      };
    });

    res.status(200).json({ message: 'Comparaison budget vs dépenses réussie', result });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la comparaison', error });
  }
};

// Générer un rapport financier
exports.generateFinancialReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Calculer les revenus
    const revenues = await Revenue.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenues.length > 0 ? revenues[0].totalRevenue : 0;

    // Calculer les dépenses
    const expenses = await Expense.aggregate([
      { $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } }
    ]);
    const totalExpenses = expenses.length > 0 ? expenses[0].totalExpenses : 0;

    // Calculer le solde bancaire
    const accounts = await BankAccount.find();
    const totalBankBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    // Calculer le solde de la caisse cash
    const cashRegister = await CashRegister.findOne();
    const totalCashBalance = cashRegister ? cashRegister.balance : 0;

    // Calculer le solde global
    const totalBalance = totalBankBalance + totalCashBalance + totalRevenue - totalExpenses;

    res.status(200).json({
      message: 'Rapport financier généré avec succès',
      report: {
        totalRevenue,
        totalExpenses,
        totalBankBalance,
        totalCashBalance,
        totalBalance
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la génération du rapport financier', error });
  }
};

// Exporter les dépenses en CSV
exports.exportExpensesToCSV = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('budgetLine').populate('supplier');

    // Créer le contenu CSV
    let csvContent = 'ID,Date,Description,Amount,Budget Line,Supplier\n';
    expenses.forEach(expense => {
      csvContent += `${expense._id},${expense.date},${expense.description},${expense.amount},${
        expense.budgetLine?.name || 'N/A'
      },${expense.supplier?.name || 'N/A'}\n`;
    });

    // Écrire dans un fichier
    const filePath = path.join(__dirname, '..', 'exports', 'expenses.csv');
    fs.writeFileSync(filePath, csvContent);

    // Envoyer le fichier en réponse
    res.download(filePath, 'expenses.csv', err => {
      if (err) {
        console.error('Erreur lors du téléchargement du fichier', err);
      }
      // Supprimer le fichier après téléchargement
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'exportation des dépenses', error });
  }
};

// Envoyer un rappel pour une créance client
exports.sendClientPaymentReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const debt = await ClientDebt.findById(id).populate('client');
    if (!debt) return res.status(404).json({ message: 'Créance client non trouvée' });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: debt.client.email,
      subject: 'Rappel de paiement',
      text: `Bonjour ${debt.client.name},\n\nNous vous rappelons que vous avez une créance impayée de ${debt.amount} €. La date d'échéance était le ${debt.dueDate}. Veuillez régulariser votre situation dès que possible.\n\nCordialement,\nVotre équipe`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Rappel envoyé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi du rappel', error });
  }
};