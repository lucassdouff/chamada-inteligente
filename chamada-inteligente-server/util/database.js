const Sequelize = require('sequelize');
const sequelize = new Sequelize('chamada_inteligente_db', 'usuario', 'usuario',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
})

module.exports = sequelize;