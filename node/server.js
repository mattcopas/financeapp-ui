const express = require('express');
const app = express();
const router = require('./routes/router');
const apiRouter = require('./routes/apiRouter');
const connection = require('./database/connection');
const path = require('path');
const relationships = require('./models/relationships');

app.use('/', router);
app.use('/api/', apiRouter);
app.use('/static/', express.static(path.resolve('../angular')));

connection.authenticate().then(function(err) {
  if(err) throw err;
  console.log("Connected to DB");
});

relationships();

var server = app.listen(3000, function() {
  console.log("Server listening");
});

module.exports = server;
