SELECT home_score AS home_score, 
away_score AS away_score,
(SELECT home_team FROM match_comp WHERE match_comp.id_match_comp = map_comp.match_comp) AS home_team,
(SELECT away_team FROM match_comp WHERE match_comp.id_match_comp = map_comp.match_comp) AS away_team
FROM map_comp;