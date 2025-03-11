const ClientUser = require('../models/clientUser');

// 1. Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, gender, nationalId, address, phoneNumber, dateOfBirth } = req.body;

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await ClientUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
        }

        // Créer un nouvel utilisateur
        const newUser = new ClientUser({
            name,
            email,
            password, // Vous devriez hacher ce mot de passe avant de le sauvegarder
            gender,
            nationalId,
            address,
            phoneNumber,
            dateOfBirth
        });

        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};


exports.updateDiscount = async (req, res) => {
    try {
        const { userId } = req.params;
        const { discount } = req.body;

        // Vérification des entrées
        if (discount === undefined || discount < 0 || discount > 100) {
            return res.status(400).json({ message: "Le discount doit être compris entre 0 et 100." });
        }

        // Trouver l'utilisateur
        const user = await ClientUser.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Mettre à jour le discount
        await user.updateDiscount(discount);

        res.status(200).json({ message: "Discount mis à jour avec succès.", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
};

// 2. Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await ClientUser.find();
        res.status(200).json({ message: 'Liste des utilisateurs récupérée avec succès', users });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
};

// 3. Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await ClientUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur récupéré avec succès', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
};

// 4. Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password, gender, nationalId, address, phoneNumber, dateOfBirth, discount } = req.body;

        const user = await ClientUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettez à jour les champs de l'utilisateur
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password; // Assurez-vous de hacher le mot de passe si nécessaire
        user.gender = gender || user.gender;
        user.nationalId = nationalId || user.nationalId;
        user.address = address || user.address;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.discount = discount !== undefined ? discount : user.discount;

        // Sauvegardez les modifications
        await user.save();

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
};

// 5. Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await ClientUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await user.remove();
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};