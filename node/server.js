const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

var server = app.listen(3000, function() {
  console.log("Server listening");
});

module.exports = server;
