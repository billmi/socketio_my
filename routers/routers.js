var express = require('express');
var router = express.Router();

module.exports = function (app,_config) {
    //router
    app.get('/', function (req, res) {
        res.render('../views/index.html', {url: _config.socketUrl});
    });
    app.get('/update', function (req, res) {
        res.render('../views/update.html', {url: _config.socketUrl});
    });
};


