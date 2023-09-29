const connection = require("../util/mysql_database");

exports.addUser = async (req, res, next) => {
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err
      
        res.status(200).json(rows[0].solution);
      })
}



