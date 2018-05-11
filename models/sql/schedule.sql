SELECT match_comp.id_match_comp AS id,
team.team_name AS home_team,
SUM(map_comp.home_score > map_comp.away_score) AS home_score,
SUM(map_comp.home_score < map_comp.away_score) AS away_score,
(SELECT team.team_name FROM team WHERE team.id_team=match_comp.away_team) AS away_team,
match_comp.date_start AS date,
match_comp.t_start AS time
FROM team 
INNER JOIN match_comp ON match_comp.home_team=team.id_team
LEFT JOIN map_comp ON map_comp.match_comp=match_comp.id_match_comp
GROUP BY match_comp.id_match_comp

UNION
SELECT match_comp.id_match_comp AS id,
team.team_name AS home_team,
SUM(map_comp.home_score > map_comp.away_score) AS home_score,
SUM(map_comp.home_score < map_comp.away_score) AS away_score,
(SELECT team.team_name FROM team WHERE team.id_team=match_comp.away_team) AS away_team,
match_comp.date_start AS date,
match_comp.t_start AS time
FROM team 
INNER JOIN match_comp ON match_comp.home_team=team.id_team
LEFT JOIN map_comp ON map_comp.match_comp=match_comp.id_match_comp
GROUP BY match_comp.id_match_comp