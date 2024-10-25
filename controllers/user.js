const User = require('../models/user');
const Investisseur = require('../models/investisseur');

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');
const {role} = require('../role')

function generateUniqueCode(users) {
  let uniqueCode;
  let isUnique = false;

  // Boucle jusqu'à ce qu'un code unique soit généré
  while (!isUnique) {
      // Générer un nouveau code au format ###-##
      const firstPart = Math.floor(100 + Math.random() * 900);  // Génère un nombre à 3 chiffres
      const secondPart = Math.floor(10 + Math.random() * 90);   // Génère un nombre à 2 chiffres
      uniqueCode = `${firstPart}-${secondPart}`;                // Combine les deux parties

      // Vérifier si ce code existe déjà dans le tableau des utilisateurs
      isUnique = !users.some(user => user.code === uniqueCode);
  }

  return uniqueCode;  // Retourne le code unique
}


// Inscription (sign up) : Génération d'un code unique
exports.signUp = async (req, res) => {
 
    try {
        // recuperer les users 
        const users = await User.find()       
        // Générer un code unique
        const randomCode = generateUniqueCode(users)
       
        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email: req.body.tel });
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        // Hashage du mot de passe
       // const hashedPassword = await bcrypt.hash(req.body.password, 12);

        // Créer un nouvel utilisateur
        const newUser = new User({
            ... req.body,           
            code: randomCode, // Assigner le code unique
            user_level: req.body.user_level || 0,
            checInsc: req.body.checInsc || false
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès.", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Connexion (login) : Connexion via code uniquement
exports.login = async (req, res, io) => {
    const { code } = req.body;

    try {
        // Vérifier si le code est valide
        const user = await User.findOne({ code });
        if (!user) {
            return res.status(400).json({ error: "Code invalide." });
        }
      
         // Émettre un événement lorsqu'un nouveau membre est inscrit
        io.emit('login', user); // Envoyer l'objet du membre à tous les clients connectés
    
        // Générer un token JWT pour authentification
        const token = jwt.sign(
            { userId: user._id, email: user.email, userLevel: user.user_level },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        res.status(200).json(
          { message: "Connexion réussie.",
            token, 
            prenom:user.prenom, 
            nom:user.nom, 
            user_level: user.user_level,
            relation:user.relation
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Obtenir les détails d'un utilisateur
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update user code

exports.updateUserCode = async (req, res) => {
  try {
      // Récupérer tous les utilisateurs existants
      const allUsers = await User.find();

      // Générer un nouveau code unique en passant le tableau des utilisateurs
      const newCode = generateUniqueCode(allUsers);

      // Mettre à jour le code de l'utilisateur
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { code: newCode }, { new: true });

      // Si l'utilisateur n'est pas trouvé
      if (!updatedUser) {
          return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      res.status(200).json({ message: "Code mis à jour avec succès.", user: updatedUser });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

 //  /api/auth/logout
 exports.logout = (req, res, next) => {
  
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        logger.error(`405 || ${err} `);
        res.status(400).json({message:'Unable to log out'})
      } else {
        logger.info(`205 || Logout successful  `);
        res.json({message:'Logout successful'})
      }
    });
  } else {
    res.end()
  }
};

// update user level
exports.updateUserLevel = async (req, res) => {
 
  const { _id, user_level } = req.body;
 
  try {
    const user = await User.findByIdAndUpdate(_id, { user_level: user_level }, { new: true });
    
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllUser = async (req, res, next) => { 

  User.find({email: { $nin: ["sironel2002@gmail.com","d@gmail.com"] }

}).then(
    (users) => {
       res.status(201).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllUserInv = async (req, res, next) => { 
 
  try {
    // Find all users with the user_level 'investisseur'
    const usersWithRole = await User.find({ user_level: role.investisseur });

    // Get the IDs of users who are already in the Investisseur model
    const linkedInvestisseurs = await Investisseur.find().select('user');
    const linkedUserIds = linkedInvestisseurs.map((inv) => inv.user.toString());

    // Filter users who are not in the Investisseur model
    const unlinkedUsers = usersWithRole.filter((user) => !linkedUserIds.includes(user._id.toString()));

    return res.status(201).json(unlinkedUsers);
  } catch (error) {
    console.error('Error fetching unlinked investisseurs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


