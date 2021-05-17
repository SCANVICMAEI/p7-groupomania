
const express = require('express');

const app = express();

const path = require('path');

const mysql2 = require('mysql2');

require('dotenv').config(); //pour definir les variables d environnement 

// Importation des  routes

const commentRoutes = require('./routes/comment'); 

const userRoutes = require ('./routes/user');

const messageRoutes = require('./routes/message');


// Mise en place securité

// var Ddos = require('ddos') //denis service

// var ddos = new Ddos({burst:10, limit:15})

// app.use(ddos.express);

const helmet = require('helmet'); //definit les entetes HTTP

 // entetes http
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded({extended: true})); //remplace bodyParser

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/comment', commentRoutes);

app.use('/message', messageRoutes);

app.use('/user', userRoutes);

app.use(helmet());

module.exports = app;