const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();

// CONNEXION BDD
const database = new Sequelize (`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`);

database.authenticate()
.then(() => console.log("connection ok !!!"))
.catch(err =>console.log("connection échouée:" + err));

module.exports = {Sequelize, DataTypes,database};
