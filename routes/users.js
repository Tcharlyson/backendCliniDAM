var express = require('express');
var router = express.Router();
var userFct = require('../models/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users');
});

/* GET one user. */
router.get('/:id', function(req, res, next) {
  res.send('User');
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
  res.send('User updated');
});

/* DELETE user in collection. */
router.delete('/delete/:id', function(req, res, next) {
  res.send('User deleted');
});

module.exports = router;
