var express = require('express');
var app = express();
var router = express.Router();
var scanner = require('./scan.js');

var port = process.env.PORT || 8080;

router.get('/scan', function(req, res) {
    res.json(scanner.signal);
});

app.use('/scanner', router);
app.listen(port);
