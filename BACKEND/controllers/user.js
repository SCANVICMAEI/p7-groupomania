const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); // token et verification 


const passwordValidator = require('password-validator');
const {
  where
} = require('sequelize');

let schema = new passwordValidator(); //Shema MDP 
schema
  .is().min(2) // min 5 caractères
  .is().max(20) //max 20caractères
  .has().uppercase() // min 1 maj
  .has().lowercase() // min 1 minuscule
  .has().digits() // min 1 chiffre
  .has().not().spaces() // sans espace
  .is().not().oneOf(['Passw0rd', 'Password123']);

//CREATION COMPTE UTILISATEUER

exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    res.status(400).json({
      error: "Le mot de passe n'ai pas assez sécurisé "
    })

  } else {
    bcrypt.hash(req.body.password, 10)  
      .then(hash => {
        User.create({
          email: req.body.email,
          username: req.body.username,
          password: hash, 
          job: req.body.job,
          bio: req.body.bio,
        })
          .then(() => res.status(201).json({
            message: 'Utilisateur créé !' + User
          }))
          .catch(error => res.status(400).json({
            error: ' Erreur Utilisateur Signup !',
          }));
      })
      .catch(error => res.status(500).json({
        error: 'utilisateur non crée'
      }));
  };
};

// CONNECTION AVEC COMPTE UTILISATEUR

exports.login = (req, res, next) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password) 
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          console.log(user)
          res.status(200).json({
            UserId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign({
              UserId: user.id,
              isAdmin: user.isAdmin
            },

              `${process.env.TOP_SECRET}`, {
              expiresIn: '24h'
            } // expire 24 h
            )
          });
          console.log("good")
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};

// SUPPRIMER COMPTE UTILISATEUR

exports.userDelete = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.TOP_SECRET}`);
  const UserId = decodedToken.UserId;
  const id = req.params.id
  const isAdmin = decodedToken.isAdmin;
  User.findOne({
    where: {
      id: id
    }
  })
    .then(user => {
      if (user.id === UserId || isAdmin === true) {
        User.destroy({
          where: {
            id: id
          }
        })

          .then(() => res.status(200).json({
            message: 'Utilisateur Supprimer !'
          }))
          .catch(error => res.status(404).json({
            message: ' Erreur Utilisateur non Supprimer !'
          }));
      } else {
        return res.status(401).json({
          error: "pas d autorisation !"
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Erreur DELETE USER "
      });
    })
};

// MODIFIER UTILISATEUR

exports.userUpdate = (req, res, next) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        })

      } else {
        user.update({
          username: req.body.username,
          job: req.body.job,
          bio: req.body.bio
        })
          .then(() => res.status(200).json({
            message: 'Utilisateur Modifier!'
          }))

          .catch(error => res.status(404).json({
            message: 'Erreur Utilisateur non Modifié !'
          }))
      }
    })
    .catch(error => res.status(404).json({
      message: 'Erreur fonction update !'
    }))
}

// RECUPERER UN UTILISATEUR 

exports.userGetOne = (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    where: {
      id: id
    }
  })
    .then(user => res.status(200).json(user))

    .catch(err => {
      res.status(500).send({
        message: "Erreur utilisateur non trouver"

      })
    })
};