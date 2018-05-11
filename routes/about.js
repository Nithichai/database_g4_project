var express = require('express');
var router = express.Router();

// connect about
router.get('/', function(req, res, next) {
  res.render('about');
});

module.exports = router;
