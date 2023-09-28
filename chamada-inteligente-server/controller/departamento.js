const connection = require("../util/mysql_database");

exports.addDepartamento = async (req, res, next) => {
    connection.query(`insert into departamento (nome) values ("${req.query.nome}")`, (err, rows, fields) => {

        if (err) throw err
      
        res.status(200).json();
      })
}
