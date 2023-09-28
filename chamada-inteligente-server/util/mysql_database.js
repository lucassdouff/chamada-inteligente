const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'usuario',
  port: 3306,
  database: 'chamada_inteligente_db'
})

connection.connect()

module.exports = connection;