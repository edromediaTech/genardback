const User = require('../models/user');
const Annee = require('../models/annee');
const Universite = require('../models/universite');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const { find } = require('../models/user');

exports.signup = async (req, res, next) => {

  const url = req.headers.origin  
  const univ = await Universite.findOne({url:url})
  
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        universite:univ._id,
        user_level:req.body.user_level,
        checkInsc:false,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => {
        Universite.findOne({ _id: univ._id }, (err, universite) => {
          
          if (universite) {
              universite.users.push(user);              
              universite.save()              
          }          
      }) 
      res.status(201).json(user)       
      
    })
      
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {  


  const url =   req.headers.origin
  const universite = await Universite.findOne({url:url})
  
  Annee.find().then(
    (annee) => {
      
         var pg_year = 0
         var lastyear = ''
        for(y of annee){
            var an =parseInt(y.nom.split('-')[1])
            if(pg_year < an){
               pg_year = an
               lastyear = y.nom
            }
        }

      //  ------------------------ fin calcul derniere annee
  
  User.findOne({ email: req.body.email,universite:universite._id })      
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
          }                  
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                  }
                  res.cookie('universite_id', user.universite_id)

                  // verify if the user is student or prof  

                  res.status(200).json({
                    userId: user._id,
                    name:user.name,
                    email:user.email,
                    user_level: user.user_level,
                    universite:user.universite,
                    checkInsc:user.checInsc,
                    anac:lastyear,
                    token: jwt.sign(
                        { userId: user._id, userLevel: user.user_level, universite:user.universite,annee:lastyear },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));

    }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.updateUser = (req, res, next) => {
  const userObject = req.body;
  delete userObject._id;
  delete userObject._userId;
  const user = new User({
    _id: req.params.id,
    ...userObject ,
    universite_id:req.auth.universite_id  
    });
  User.updateOne({_id: req.params.id}, user).then(
    () => {
      res.status(201).json({
        message: 'user updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.deleteUser = (req, res, next) => {
  
  User.findOne({ _id: req.params.id})
      .then(user => {
                  
                  const universite_id = user.universite_id
                  
                  User.deleteOne({_id: req.params.id})
                      .then(() => { 
                        Universite.findOne({ _id: universite_id }, (err, universite) => {
                          if (universite) {
                              
                              universite.users.splice(universite.users.indexOf(req.params.id),1);
                              universite.save();
                              res.status(200).json({message: 'Objet supprimé !'})
                              
                          }
                      })
                    })
                      .catch(error => res.status(401).json({ error }));
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getAllUser = async (req, res, next) => {
  const url =   req.headers.origin
  const univ = await Universite.findOne({url:url})

  User.find({universite:univ._id,email: { $nin: ["sironel2002@gmail.com","d@gmail.com"] },
  _id:{ $nin: [req.auth.userId] } 
}).then(
    (users) => {
       res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// //  /api/auth/logout
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
