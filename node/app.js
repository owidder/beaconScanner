var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();
var router = express.Router();
var scanner = require('./scan.js');

var port = process.env.PORT || 18080;

if(process.argv[2] == '--fake') {
    scanner.startFake(2000);
}
else {
    scanner.startScan(2000);
}

router.get('/scan', function(req, res) {
    res.json(scanner.beacons);
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/scanner', router);
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.listen(port);
