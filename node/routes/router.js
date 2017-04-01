const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', function(request, response) {
  response.sendFile(path.resolve('../index.html'));
});

module.exports = router;
