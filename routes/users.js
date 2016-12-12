var express = require('express');
var router = express.Router();
var userFct = require('../models/users.js');

// middleware to set header to json
router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  userFct.getAllUsers().then((users) => {
    res.json({ data: users })
  }).catch((err) => {
    res.json({ error: err })
  })
});

/* GET one user. */
router.get('/:id', function(req, res, next) {
  userFct.getUser(req.params.id).then((user) => {
    res.json({ data: user });
  }).catch((err) => {
    res.json({ error: err })
  });
});

/* INSERT new user. */
router.post('/add', function(req, res, next) {
  userFct.insertUser(req.body).then((message) => {
    res.json({ message: 'User created.' });
  }).catch((err) => {
    res.json({ error: err })
  });
});

/* MODIFY user in collection. */
router.put('/modify/:id', function(req, res, next) {
  userFct.updateUser(req.params.id,req.body).then((message) => {
    res.json({ message: 'User updated.' });
  }).catch((err) => {
    res.json({ error: err })
  });
});

/* DELETE user in collection. */
router.delete('/delete/:id', function(req, res, next) {
  userFct.deleteUser(req.params.id).then((message) => {
    res.json({ message: 'User deleted.' });
  }).catch((err) => {
    res.json({ error: err })
  });
});

module.exports = router;
