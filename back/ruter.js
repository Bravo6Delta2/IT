const { response } = require('express');
var express = require('express')
var http = require('http');
var path = require('path');

var app = express.Router();

app.route(__filename).get(async (require,response) =>{

    response.statusCode = 300;
    response.end('dddd');
});

module.exports = app;