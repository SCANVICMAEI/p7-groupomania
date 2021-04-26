const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); // token et verification 

const passwordValidator = require('password-validator');
const {
  where
} = require('sequelize');

// let schema = new passwordValidator();//Shema MDP 
// schema
// .is().min(2) 
// .is().max(10) 
// .has().uppercase() 
// .has().lowercase() 
// .has().digits() 
// .has().not().spaces()  
// .is().not().oneOf(['Passw0rd', 'Password123']);

//CREATION COMPTE UTILISATEUER

exports.signup = (req, res, next) => {
  // if(!schema.validate(req.body.password)) {
  //   //   throw {error:'Attention le mot de passe n ai  pas assez securisé'}
  // }else {
  bcrypt.hash(req.body.password, 10) // hash mdp 
    .then(hash => {
      console.log(hash);
      User.create({
          email: req.body.email,
          username: req.body.username,
          password: hash,
          job: req.body.job,
          bio: req.body.bio,

        })

        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error: 'utilisateur non crée'
    }));
};
// };

// CONNECTION AVEC COMPTE UTILISATEUR

exports.login = (req, res, next) => {
  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password) // compare mdp requète et mdp bdd
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({
                userId: user.id
              },
              `${process.env.TOP_SECRET}`, {
                expiresIn: '24h'
              } // expire 24 h 
            )
          });
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
  const id = req.params.id
  User.destroy({
      where: {
        id: id
      }
    })
    .then(() => res.status(200).json({
      message: 'Utilisateur Supprimer !' + user
    }))
    .catch(error => res.status(404).json({
      message: ' Erreur Utilisateur non Supprimer !'+ user
    }));
}


// MODIFIER UTILISATEUR

exports.userUpdate = (req, res, next) => {
  User.update({
      where: {
        email: req.body.email
      },
      where: {
        username: req.body.username
      },
      where: {
        job: req.body.job
      },
      where: {
        bio: req.body.bio
      }
    })

    .then(() => res.status(200).json({
      message: 'Utilisateur Modifier!'
    }))
    .catch(error => res.status(404).json({
      message: 'Erreur Utilisateur non Modifier !'
    }));
};

// RECUPERER UN UTILISATEUR 

exports.userGetOne = (req, res, next) => {

  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};








    // const id = req.params.id
    // User.findByPk(id) {
    //     .then(User) => {
    //         res.send(User);
    //       })
    //       .catch(err => {
    //           res.status(500).send({
    //             message: "Error retrieving Tutorial with id=" + id
    //           });
    //         }
      