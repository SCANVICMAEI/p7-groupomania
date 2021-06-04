
const express = require('express');

const app = express();

const path = require('path');

const mysql2 = require('mysql2');

require('dotenv').config(); 

// Importation des  routes

const commentRoutes = require('./routes/comment'); 

const userRoutes = require ('./routes/user');

const messageRoutes = require('./routes/message');


const helmet = require('helmet'); 

 // entetes http
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded({extended: true})); 

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/comment', commentRoutes);

app.use('/message', messageRoutes);

app.use('/user', userRoutes);

app.use(helmet());

module.exports = app;