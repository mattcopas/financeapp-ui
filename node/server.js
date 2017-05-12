const express = require('express');
const app = express();
const router = require('./routes/router');
const apiRouter = require('./routes/apiRouter');
const connection = require('./database/connection');
const path = require('path');
const relationships = require('./models/relationships');
const logger = require('./logger/logger');

app.use('/', router);
app.use('/api/', apiRouter);
app.use('/static/', express.static(path.resolve('../angular')));

connection.authenticate().then(function(err) {
  if(err) throw err;
  logger.info("Connected to DB");
});

relationships();

connection.sync().then(function() {
  logger.info("DB synced");
});

var server = app.listen(3000, function() {
  logger.info("Server listening");
});

module.exports = server;
