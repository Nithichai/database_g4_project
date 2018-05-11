var express = require('express');
var router = express.Router();
var fs = require('fs');
var team_model = require('../models/team_model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    team_model.send_table(function(message) {
    	console.log(message);
        res.render('team_index', {'data' : message});
    });
});


module.exports = router;
