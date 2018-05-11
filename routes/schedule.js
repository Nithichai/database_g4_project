var express = require('express');
var router = express.Router();
var fs = require('fs');
var dateFormat = require('dateformat');
var schedule_model = require('../models/schedule_model');
var schedule_match_model = require('../models/schedule_match_model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    schedule_model.send_table(function(message) {
        for (var i = 0; i < message.length; i++) {
            var dt = new Date(message[i]["date"]);
            var date_start = dateFormat(dt, "ddd d mmm yyyy");
            var time_start = dateFormat(dt, "hh:MM");
            message[i]["date"] = date_start.toString();
            message[i]["time"] = time_start.toString();
        }
        res.render('schedule_index', {'data' : message});
    });
});

router.get('/:match_id', function(req, res, next) {
    schedule_match_model.send_table(req.params.match_id, function(message) {
        description_arr = [];
        var sum_home = 0;
        var sum_away = 0;
        for (var i = 0; i < message.length; i++) {
            description = {};
            description["round"] = i;
            description["map"] = message[i]["map"];
            description["map_type"] = message[i]["map_type"];
            description["home_score"] = message[i]["home_score"];
            description["away_score"] = message[i]["away_score"];
            if (message[i]["home_score"] > message[i]["away_score"]) {
                sum_home++;
            } else if (message[i]["home_score"] < message[i]["away_score"]) {
                sum_away++;
            }
            description_arr.push(description);
        }
        new_msg = {
            'home_team' : message[0]['home_team'],
            'away_team' : message[0]['away_team'],
            'home_score' : sum_home,
            'away_score' : sum_away,
            'description' : description_arr
        }
        res.render('schedule_match', {'data' : new_msg});
    });
});

module.exports = router;
