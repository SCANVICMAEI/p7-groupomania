//IMPORTS
const {
  Message,
  User,
  Comment
} = require('../models/relations');

const jwt = require('jsonwebtoken');

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
    attachment: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),
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
        include: [{
          model: User
        }],
      }
    ],
    order: [[
      "createdAt", "DESC"
    ]]
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

exports.deleteMessage = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1]; // EXTRAIT LE TOKEN DE LA REQUETE
  const decodedToken = jwt.verify(token, process.env.TOP_SECRET); // DECRYPTE AVEC CLES
  const userId = decodedToken.userId;// RECUPERATION DU TOKEN 
  const id = req.params.id
  const isAdmin = decodedToken.isAdmin; // VERIFICATION IS ADMIN 

  Message.findOne({
    where: {id: id}
  })
    .then(message => {
      if (message.idUser == userId || isAdmin== true ) { // SI LES ID SONT SIMILAIRE OU SI ADMIN EST TRUE

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
      }
      else{
        return res.status(401).json({error:"autorisation admin requis !"})
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Erreur delete Message "
      });
    })
};