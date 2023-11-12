const Sequelize = require('sequelize');
const sequelize = new Sequelize('chamada_inteligente_db', 'root', 'lucas123',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    dialectOptions: {
        useUTC: false,
    },
})

module.exports = sequelize;