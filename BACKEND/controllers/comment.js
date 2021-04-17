//IMPORTS
const Comment = require('../models/comment');
const fs = require('fs');

const {
  where
} = require('sequelize');

// ROUTES

// NEW MESSAGE 

// exports.createComment = (req, res, next) => {
//   const comment = req.body;
//   comment.create({
//       content: comment.content
//     }).then(comment => {
//       res.status(201).json({
//         comment: content
//       })
//     })
//     .catch(error => res.status(400).json({
//       error: "Erreur POST message "
//     }));
// };

// GET ALL MESSAGE

// exports.allComment = (req, res, next) => {
//   Message.findAll()
//     .then((message) => {
//       res.status(201).json({
//         message: message
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: "Erreur GET message "
//       });
//     });
// };

