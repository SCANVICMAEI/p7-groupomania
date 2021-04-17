//IMPORTS
const Message = require('../models/message');
const fs = require('fs');

const {
  where
} = require('sequelize');

// ROUTES

// NEW MESSAGE 

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

// GET ALL MESSAGE

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


// DELETE ONE MESSAGE 

// exports.deleteMessage = (req, res, next) => {
//     Message.findOne({
//       id: req.body.id
//     })
//     Sauce.deleteOne({
//         id: req.params.id
//       })
//       .then(() => res.status(200).json({
//         message: 'Message supprimé !'
//       }))
//       .catch(error => res.status(400).json({
//         error
//       }));
//   };