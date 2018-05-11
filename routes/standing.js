var express = require('express');
var router = express.Router();
var fs = require('fs');
var standing_model = require('../models/standing_model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    standing_model.send_table(function(message) {
    	team_name = [
    		'New York Excelsior',
    		'Los Angeles Valiant',
    		'Boston Uprising',
    		'Philadelphia Fusion',
    		'Seoul Dynasty',
    		'Dallas Fuel',
    		'Los Angeles Gladiators',
    		'San Francisco Shock',
    		'Houston Outlaws',
    		'London Spitfire',
    		'Florida Mayhem',
    		'Shanghai Dragons'
    	];
    	team = {};
    	for (var i = 0; i < 12; i++) { 
    		team[i] = {
    			"team" : team_name[i],
    			"win" : 0,
    			"lose" : 0,
    			"win_map" : 0,
    			"lose_map" : 0,
    			"tie_map" : 0
    		};
    	}
    	for (var i = 0; i < message.length; i+=5) {
    		var home = 0;
    		var away = 0;
    		for (var j = i; j < i+5; j++) {
    			if (message[j]["home_score"] > message[j]["away_score"]) {
    				if (j != 4) {
    					team[message[j]["home_team"]-1]["win_map"]++;
    					team[message[j]["away_team"]-1]["lose_map"]++;
    				}
    				home++;
    			} else if (message[j]["home_score"] < message[j]["away_score"]) {
    				if (j != 4) {
	    				team[message[j]["home_team"]-1]["lose_map"]++;
	    				team[message[j]["away_team"]-1]["win_map"]++;
	    			}
    				away++;
    			} else if (message[j]["home_score"] == message[j]["away_score"] && message[j]["home_score"] != null && message[j]["away_score"] != null) {
    				team[message[j]["home_team"]-1]["tie_map"]++;
    				team[message[j]["away_team"]-1]["tie_map"]++;
    			}
    		}
    		if (home > away) {
    			team[message[i]["home_team"]-1]["win"]++;
    			team[message[i]["away_team"]-1]["lose"]++;
    		} else if (home < away) {
    			team[message[i]["away_team"]-1]["win"]++;
    			team[message[i]["home_team"]-1]["lose"]++;
    		}
    	}
        res.render('standing_index', {'data' : team});
    });
});

module.exports = router;
