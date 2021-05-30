//IMPORTS

const jwt = require('jsonwebtoken');
const {
  Message,
  User,
  Comment
} = require('../models/relations')
const fs = require('fs');

const {
  where
} = require('sequelize');

// ROUTES

//CREATION COMMENTAIRE

exports.createComment = (req, res, next) => {
//récupere id avec le token
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.TOP_SECRET}`);
  const userId = decodedToken.userId;

  const comment = req.body;
//récupère id du message
  const MessageId = req.params.id

  Comment.create({
      content: comment.content,
      MessageId: MessageId,
      UserId: userId,
    })

    .then(comment => {
      res.status(201).json({
        message: comment
      })
    })
    .catch(error => res.status(400).json({
      error: "Erreur POST comment "
    }));
};

// RECUPERATION DE TOUS LES COMMENTAIRES

exports.allComment = (req, res, next) => {
  Comment.findAll()
    .then((comment) => {
      res.status(201).json({
        message: comment
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: "Erreur GET all comment "
      });
    });
};

// SUPPRIMER UN COMMENTAIRE 

exports.deleteComment = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1]; // EXTRAIT LE TOKEN DE LA REQUETE
  const decodedToken = jwt.verify(token, process.env.TOP_SECRET); // DECRYPTE AVEC CLES
  const userId = decodedToken.userId;// RECUPERATION DU TOKEN 
  const id = req.params.id
  const isAdmin = decodedToken.isAdmin; // VERIFICATION IS ADMIN 
  
  Comment.findOne({
    where: {id: id}
  })
    .then(comment => {
      if (comment.UserId == userId || isAdmin == true ) { // SI LES ID SONT SIMILAIRE OU SI ADMIN EST TRUE

        Comment.destroy({
          where: {
            id: id
          }
        })
          .then(() => res.status(200).json({
            message: 'commentaire supprimé !' + id
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
        message: "Erreur deleteComment "
      });
    })
};