const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;

module.exports = new Sequelize(dbName, username, password, {
  host: dbHost,
  dialect: dbDialect
});
