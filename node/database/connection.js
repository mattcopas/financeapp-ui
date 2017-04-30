const Sequelize = require('sequelize');

const username = 'postgres';
const password = 'password';

module.exports = new Sequelize('financeappdb', username, password, {
  host: 'localhost',
  dialect: 'postgres'
});
