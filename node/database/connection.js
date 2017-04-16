const Sequelize = require('sequelize');

module.exports = new Sequelize('financeappdb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});
