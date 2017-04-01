const express = require('express');
const app = express();
const router = require('./routes/router');
const apiRouter = require('./routes/apiRouter');
const connection = require('./database/connection')();

app.use('/', router);
app.use('/api/', apiRouter);

var server = app.listen(3000, function() {
  console.log("Server listening");
});

module.exports = server;
