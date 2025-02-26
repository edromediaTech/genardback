const CashRegister = require('../models/cashRegister');

// Créer une caisse cash
exports.createCashRegister = async (req, res) => {
  try {
    const { balance } = req.body;
    const cashRegister = new CashRegister({ balance });
    await cashRegister.save();
    res.status(201).json({ message: 'Caisse cash créée avec succès', cashRegister });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la caisse cash', error });
  }
};

// Récupérer la caisse cash
exports.getCashRegister = async (req, res) => {
  try {
    const cashRegister = await CashRegister.findOne();
    if (!cashRegister) return res.status(404).json({ message: 'Caisse cash non trouvée' });
    res.status(200).json({ message: 'Caisse cash récupérée avec succès', cashRegister });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la caisse cash', error });
  }
};

// Ajouter une transaction à la caisse cash
exports.addTransactionToCashRegister = async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const cashRegister = await CashRegister.findOne();
    if (!cashRegister) return res.status(404).json({ message: 'Caisse cash non trouvée' });

    // Mise à jour du solde
    if (type === 'income') {
      cashRegister.balance += amount;
    } else if (type === 'expense') {
      cashRegister.balance -= amount;
    }

    // Ajout de la transaction
    cashRegister.transactions.push({ amount, type, description });
    await cashRegister.save();

    res.status(200).json({ message: 'Transaction ajoutée avec succès', cashRegister });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la transaction', error });
  }
};