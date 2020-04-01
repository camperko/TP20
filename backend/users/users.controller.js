const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/registration', registration);

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
}