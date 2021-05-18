//IMPORTS

const jwt = require('jsonwebtoken');
const {
  Message,
  User,
  Comment
} = require('../models/relations');

const fs = require('fs');

const {
  where
} = require('sequelize');
const {
  URLSearchParams
} = require('url');

// ROUTES

// CREATION MESSAGE TCHAT

exports.createMessage = (req, res, next) => {
//récupere id avec le token
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.TOP_SECRET}`);
  const userId = decodedToken.userId;

  Message.create({
      idUser: userId,
      message: req.body.message,
    }).then(message => {
      res.status(201).json({
        message: message
      })
    })
    .catch(error => res.status(400).json({
      error: "Erreur POST message "
    }));
};

// RECUPERATION DE TOUS LES MESSAGES + COMMENT + USER

exports.allMessage = (req, res, next) => {

  Message.findAll({
      include: [
        {
          model: Comment,
          include:[{
            model:User
          }],
        }
      ]
    }).then((Message) => {
      res.status(201).json(
        (Message)
      );
    })
    .catch((err) => {
      res.status(400).json({
        message: "Erreur GET allMessage "
      });
    })
}


// SUPPRIMER UN MESSAGE
//att verifier is admin + identiter utilisateur 

exports.deleteMessage = (req, res, next) => {
  const id = req.params.id
  Message.destroy({
      where: {
        id: id
      }
    })
    .then(() => res.status(200).json({
      message: 'Message supprimé !' + id
    }))
    .catch(error => res.status(400).json({
      error
    }));
};