//IMPORTS
const Message = require('../models/message');
const fs = require('fs');

const {where} = require('sequelize');

// ROUTES

// CREATION MESSAGE TCHAT

exports.createMessage = (req, res, next) => {
  const message = req.body;
  Message.create({
      idUser: message.idUser,
      message: message.message,
    }).then(message => {
      res.status(201).json({
        message: message
      })
    })
    .catch(error => res.status(400).json({
      error: "Erreur POST message "
    }));
};

// RECUPERATION DE TOUS LES MESSAGES

exports.allMessage = (req, res, next) => {
  Message.findAll()
    .then((message) => {
      res.status(201).json({
        message: message
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: "Erreur GET message "
      });
    });
};


// SUPPRIMER UN MESSAGE

exports.deleteMessage =(req, res, next) => {
  const id = req.params.id
 Message.destroy({where:{id:id}})
      .then(() => res.status(200).json({
        message: 'Message supprimé !'+ id
      }))
      .catch(error => res.status(400).json({
        error
      }));
};