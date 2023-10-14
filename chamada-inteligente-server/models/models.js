const Sequelize = require('sequelize');
const database = require('../util/db');

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
});

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
            model : 'departments',
            key: 'id_department'
        }
    }
});

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
});

const Teacher = database.define('teacher', {
    id_teacher: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model : 'users',
            key: 'id_user'
        },
    },
    id_department: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "departments",
            key: 'id_department'
        }
    }
});

const Student = database.define('student', {
    id_aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "users",
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
            model: "courses",
            key: 'id_course'
        }
    }
});

const Class = database.define('classe',{
    id_class:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type:Sequelize.STRING,
        allowNull: false
    },
    class_schedule: {
        type: Sequelize.TIME,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_teacher:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'teachers',
            key: 'id_teacher'
        }
    },
    id_course:{
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'courses',
            key: 'id_course'
        }
    }
})

const Attendance_roll = database.define('attendance_roll', {
    id_attendance_roll: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_class: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "classes",
            key: 'id_class'
        }
    }
    ,
    data_hour:{
        type: Sequelize.TIME,
        allowNull: false
    }
});

const Attendance = database.define('attendance', {
    id_attendance :{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    hour: {
        type: Sequelize.TIME,
    },
    validation: {
        type: Sequelize.BOOLEAN
    },
    medical_certificate: {
        type: Sequelize.STRING
    },
    id_attendance_roll :{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'attendance_rolls',
            key: 'id_attendance_roll'
        }
    },
    enrollment_student:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'students',
            key: 'enrollment'
        }
    }
});

const Class_student = database.define('class_student', {
    id_class: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'classes',
            key: 'id_class'
        }
    },
    enrollment_student: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'students',
            key: 'enrollment'
        }
    }
})




module.exports = {Department, Course, User, Teacher, Student, Class, Attendance_roll, Attendance, Class_student};