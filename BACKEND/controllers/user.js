
const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); // token et verification 

const passwordValidator = require('password-validator');
const { where } = require('sequelize');


// let schema = new passwordValidator();//Shema MDP 
// schema
// .is().min(2) 
// .is().max(10) 
// .has().uppercase() 
// .has().lowercase() 
// .has().digits() 
// .has().not().spaces()  
// .is().not().oneOf(['Passw0rd', 'Password123']);

exports.signup = (req, res, next) => {
  // if(!schema.validate(req.body.password)) {
//   //   throw {error:'Attention le mot de passe n ai  pas assez securisé'}
// }else {
    bcrypt.hash(req.body.password, 10)// hash mdp 
      .then(hash => {
        console.log(hash);
       User.create({
          email:req.body.email, 
          username : req.body.username,
          password: hash,
          job :req.body.job,
          bio :req.body.bio,
         
        })
       
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    } ;
  // };

  exports.login = (req, res, next) => {
    User.findOne({
      where: { email:req.body.email}
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // compare mdp requète et mdp bdd
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                `${process.env.TOP_SECRET}`,
                { expiresIn: '24h' } // expire 24 h 
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }; 
