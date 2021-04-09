const {Sequelize,DataTypes} = require('sequelize');
require('dotenv').config();

//connection bdd
const database = new Sequelize (`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}}`);

database.authenticate()
.then(() => console.log("connection ok"))
.catch(err =>console.log("connection échouer:" + err));

module.exports = {Sequelize, DataTypes,database};
