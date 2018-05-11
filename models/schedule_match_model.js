var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

var schedule_match_model = function() {
    this.send_table = function(id, callback) {
        fs.readFile('./models/sql/schedule_match.sql', function(err, data) {
            if (err) console.error(err);
            sql = data.toString();
            connection.query(sql, id, function (error, results, fields) {
                if(error) {
                    callback(error);
                } else {
                    callback(results);
                }
            });
        });
    };
}

module.exports = new schedule_match_model();
