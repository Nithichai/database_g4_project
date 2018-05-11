SELECT (SELECT team_name FROM team WHERE match_comp.home_team = team.id_team) AS home_team,
map_comp.home_score AS home_score,
(SELECT team_name FROM team WHERE match_comp.away_team = team.id_team) AS away_team,
map_comp.away_score AS away_score,
map.map_name AS map,
(SELECT map_type_name FROM map_type WHERE map.map_type = map_type.id_map_type) AS map_type
FROM map_comp
INNER JOIN map ON map_comp.map = map.id_map
INNER JOIN map_type ON map.map_type = map_type.id_map_type
INNER JOIN match_comp ON match_comp.id_match_comp = map_comp.match_comp
WHERE map_comp.match_comp = ?
ORDER BY round