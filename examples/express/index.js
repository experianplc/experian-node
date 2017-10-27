'use strict';

const express = require('express');
const app = express();

const clientId = process.env['EXPERIAN_CLIENT_ID'];
const clientSecret = process.env['EXPERIAN_CLIENT_SECRET'];
const username = process.env['EXPERIAN_USERNAME'];
const password = process.env['EXPERIAN_PASSWORD'];
const subcode = process.env['EXPERIAN_SUBCODE'];

const Experian = require('experian-node');
var experianInstance = new Experian(clientId, clientSecret);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/search', function(req, res) {

    let myRequest = req.body;

    experianInstance.business.us.search(myRequest)
        .then((data) => {
            console.log('Got Data!');
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }, (error) => {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.send(error);
        });
});

app.get('/headers/:bin', function(req, res) {
    experianInstance.business.us.headers({
            subcode: subcode,
            bin: req.params.bin
        })
        .then((data) => {
            console.log('Got Data!');
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }, (error) => {
            console.error(error);
            res.setHeader('Content-Type', 'application/json');
            res.send(error);
        });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
    experianInstance.login(username, password)
        .then((result) => {
            console.log('Logged In To Experian API');
        });
});