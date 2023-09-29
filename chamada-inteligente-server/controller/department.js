const connection = require("../util/mysql_database");

exports.deleteDepartment = async (req, res, next) => {
    const { id } = req.params;
    connection.query('DELETE  FROM DEPARTAMENTO WHERE id_departamento = '+id, (err, rows, fields) => {
        
        if (err) throw err
            
        console.log('Deleted Row(s):', rows);
        res.status(200);
      })
}
