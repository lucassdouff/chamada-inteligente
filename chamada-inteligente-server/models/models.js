const Sequelize = require('sequelize');
const database = require('../util/database');

const opts = {
    modelName: 'singularName',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
}

const Department = database.define('department', {
    id_department: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},opts);

const Course = database.define('course', {
    id_course: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_department : {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
            model : 'department',
            key: 'id_department'
        }
    }
},opts);

const User = database.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},opts);

const Teacher = database.define('teacher', {
    id_teacher: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model : 'user',
            key: 'id_user'
        },
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    id_department: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "department",
            key: 'id_department'
        }
    }
},opts);

const Student = database.define('student', {
    id_student: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "user",
            key: 'id_user'
        }
    },
    enrollment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    id_course:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "course",
            key: 'id_course'
        }
    }
},opts);


module.exports = {Department, User, Teacher, Student, Course};