//IMPORTS
const Comment = require('../models/comment');
const Message = require('../models/message');
const User = require('../models/user');

const fs = require('fs');

const {
  where
} = require('sequelize');

// ROUTES

//CREATION COMMENTAIRE

exports.createComment = (req, res, next) => {
  const comment = req.body;
  Comment.create({
      content: comment.content,
      idMessage: comment.idMessage,
      idUser:comment.idUser
    }).then(comment => {
      res.status(201).json({
      message:comment
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

exports.deleteComment= (req, res, next) => {
  const id = req.params.id
  Comment.destroy({where:{id:id}})
       .then(() => res.status(200).json({
         message: 'commentaire supprimé !'+ id
       }))
       .catch(error => res.status(400).json({
         error
       }));
};

