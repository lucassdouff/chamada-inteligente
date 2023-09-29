const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'CHAMADA_INTELIGENTE_DB'
})

connection.connect()

module.exports = connection;