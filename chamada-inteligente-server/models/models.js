const Sequelize = require('sequelize');
const database = require('../util/database');
const UUIDV4 = Sequelize.UUIDV4; // falta instalar o pacotee "npm install sequelize-uuid"

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
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
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
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
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

const Class = database.define('class',{
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
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    semester: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_teacher:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'teacher',
            key: 'id_teacher'
        }
    },
    id_course:{
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'course',
            key: 'id_course'
        }
    }
},opts)

const Class_Weekday = database.define('class_weekday', {
    id_class: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'class',
            key: 'id_class'
        }
    },
    weekday: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    start_hour: {
        type: Sequelize.TIME,
        allowNull: false,
    }
});

const Class_Student = database.define('class_student', {
    id_class: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'class',
            key: 'id_class'
        }
    },
    id_student: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'student',
            key: 'id_student'
        }
    }
}, opts);

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
            model: "class",
            key: 'id_class'
        }
    }
    ,
    datetime: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, opts);

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
            model: 'attendance_roll',
            key: 'id_attendance_roll'
        }
    },
    id_student:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'student',
            key: 'id_student'
        }
    }
}, opts);


module.exports = {Department, User, Teacher, Student, Course, Class, Class_Student, Attendance_roll, Attendance, Class_Weekday};