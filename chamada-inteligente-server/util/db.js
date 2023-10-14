const Sequelize = require('sequelize');
const sequelize = new Sequelize('chamada_inteligente_db', 'root', 'root',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = sequelize;