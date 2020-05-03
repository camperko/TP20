const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const cors = require('cors');

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('./logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

var corsOptions = {
    origin: 'https://blockpay.azurewebsites.net',
    optionSuccessStatus: 200
  }

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/registration', registration);


console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function registration(req, res){
    userService.registration(req.body)
        .then(data => data ? res.send(JSON.stringify({value: 'success'})) : res.send(JSON.stringify({value: 'fail'})))
        .catch(err => console.log(err));
        console.log(JSON.stringify(req.header));
        console.log(JSON.stringify(req.body));
        console.log(JSON.stringify(res.header));
        console.log(JSON.stringify(res.body));
}