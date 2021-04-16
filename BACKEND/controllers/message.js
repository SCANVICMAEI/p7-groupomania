//IMPORTS
const Message = require('../models/Message');
const fs = require('fs');
const message = require('../models/Message');
const {where} = require('sequelize');

// ROUTES

// NEW MESSAGE 

// exports.createMessage = (req, res, next) => {
//   const message = req.body;
//   Message.create({
//       idUser: message.idUser,
//       message: message.message,
//     }).then(message => {
//       res.status(201).json({
//         message: message
//       })
//     })
//     .catch(error => res.status(400).json({
//       error: "Erreur POST message "
//     }));
// };

// GET ALL MESSAGE

// exports.allmessage = (req, res, next) => {
//   Message.findAll(where {message: req.body.message})
//   .then((message) => {
//       res.status(201).json({message:message});
//     })
//     .catch((error) => {res.status(400).json({ error: "Erreur GET message "
//       });
//     });
// };


// DELETE ONE MESSAGE 

//  exports.deleteMessage = (req, res, next) => {

//  }