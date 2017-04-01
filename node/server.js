const express = require('express');
const app = express();
const router = require('./routes/router');

// app.use(express.static(__dirname + '/../'));

app.use('/', router);

var server = app.listen(3000, function() {
  console.log("Server listening");
});

module.exports = server;
