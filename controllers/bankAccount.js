const BankAccount = require('../models/bankAccount');

// Créer un compte bancaire
exports.createAccount = async (req, res) => {
    
    try {
        const { accountName, accountNumber, balance, bank, devise } = req.body;
        const newAccount = new BankAccount({ accountName, accountNumber, balance, bank, devise });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtenir tous les comptes
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await BankAccount.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir un compte par ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await BankAccount.findById(req.params.id);
        if (!account) return res.status(404).json({ message: 'Compte non trouvé' });
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un compte bancaire
exports.updateAccount = async (req, res) => {
    try {
        const updatedAccount = await BankAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccount) return res.status(404).json({ message: 'Compte non trouvé' });
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un compte bancaire
exports.deleteAccount = async (req, res) => {
    try {
        const deletedAccount = await BankAccount.findByIdAndDelete(req.params.id);
        if (!deletedAccount) return res.status(404).json({ message: 'Compte non trouvé' });
        res.status(200).json({ message: 'Compte supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Déposer de l'argent
exports.deposit = async (req, res) => {
    try {
        const { amount, auteur, description } = req.body;
        const account = await BankAccount.findById(req.params.id);
        if (!account) return res.status(404).json({ message: 'Compte non trouvé' });
        
        account.balance += amount;
        account.transactions.push({ date: new Date(), amount, auteur, type: 'deposit', description });
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retirer de l'argent
exports.withdraw = async (req, res) => {
    try {
        const { amount, auteur, description } = req.body;
        const account = await BankAccount.findById(req.params.id);
        if (!account) return res.status(404).json({ message: 'Compte non trouvé' });
        
        if (account.balance < amount) {
            return res.status(400).json({ message: 'Fonds insuffisants' });
        }
        if (account.balance - amount < 100) {
            return res.status(402).json({ message: 'Balance inferieure au minimum' });
        }

        account.balance -= amount;
        account.transactions.push({ date: new Date(), auteur,  amount, type: 'withdrawal', description });
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//utils


// Obtenir le relevé d’un compte pour une période donnée
exports.getStatement = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Les dates de début et de fin sont requises." });
        }

        const account = await BankAccount.findById(id);
        if (!account) return res.status(404).json({ message: "Compte non trouvé" });

        // Filtrer les transactions dans la plage de dates
        const filteredTransactions = account.transactions.filter(tx => 
            new Date(tx.date) >= new Date(startDate) && new Date(tx.date) <= new Date(endDate)
        );

        res.status(200).json({ 
            accountName: account.accountName,
            accountNumber: account.accountNumber,
            balance: account.balance,
            transactions: filteredTransactions
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir le solde actuel d’un compte
exports.getBalance = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await BankAccount.findById(id);
        if (!account) return res.status(404).json({ message: "Compte non trouvé" });

        res.status(200).json({ 
            accountName: account.accountName,
            accountNumber: account.accountNumber,
            balance: account.balance,
            devise: account.devise
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir les transactions d’un type donné (dépôt/retrait)
exports.getTransactionsByType = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        if (!['deposit', 'withdrawal'].includes(type)) {
            return res.status(400).json({ message: "Type invalide. Utilisez 'deposit' ou 'withdrawal'." });
        }

        const account = await BankAccount.findById(id);
        if (!account) return res.status(404).json({ message: "Compte non trouvé" });

        const filteredTransactions = account.transactions.filter(tx => tx.type === type);
        
        res.status(200).json({ 
            accountName: account.accountName,
            accountNumber: account.accountNumber,
            transactions: filteredTransactions
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Rechercher des comptes bancaires par banque
exports.getAccountsByBank = async (req, res) => {
    try {
        const { bank } = req.query;
        if (!bank) return res.status(400).json({ message: "Veuillez spécifier une banque." });

        const accounts = await BankAccount.find({ bank });
        if (accounts.length === 0) return res.status(404).json({ message: "Aucun compte trouvé pour cette banque." });

        res.status(200).json(accounts);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
