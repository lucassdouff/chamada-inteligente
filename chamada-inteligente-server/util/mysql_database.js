const mysql = require('mysql2')

const config = require('../config/mysql_config');
const connection = mysql.createConnection(config)

connection.connect()

module.exports = connection;