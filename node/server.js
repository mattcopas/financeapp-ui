const express = require('express');
const app = express();
const router = require('./routes/router');
const path = require('path');
const logger = require('./logger/logger');

app.use('/', router);
app.use('/static/', express.static(path.resolve('../angular')));

var server = app.listen(3000, function() {
  logger.info("Server listening on port 3000");
});

module.exports = server;
