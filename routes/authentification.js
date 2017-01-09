var express = require('express');
var router = express.Router();
var authFct = require('../models/users.js');

// middleware to set header to json
router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* POST login to authentificate user. */
router.post('/', function(req, res, next) {
  authFct.authentification(req.body).then((token) => {
    res.json({
          success: true,
          message: 'Authentification OK',
          token: token
        });
  }).catch((err) => {
    res.json({ error: err })
  })
});

module.exports = router;
