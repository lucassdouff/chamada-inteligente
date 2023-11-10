const Sequelize = require('sequelize');
const sequelize = new Sequelize('chamada_inteligente_db', 'root', 'lucas123',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    dialectOptions: {
        useUTC: true,
    },
    timezone: '-03:00',
})

module.exports = sequelize;