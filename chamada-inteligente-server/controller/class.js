const sequelize = require('../util/database');
const { Class, Class_Student, Class_Weekday } = require('../models/models'); 

exports.getClasses = async (req, res, next) => {
    const {id, role} = req.query;

    try {
        if (role === "teacher") {
            const classes = await getTeacherClasses(id);
            return res.status(200).json(classes);
        } else if (role === "student") {
            const classes = await getStudentClasses(id);
            return res.status(200).json(classes);
        }
    } catch {
        return res.status(500).json({error: "An error occurred while getting classes"})
    }
};


const getTeacherClasses = async(id_teacher) => {

    const classes = await Class.findAll({
        where: {
            id_teacher
        }
    })

    const promises = classes.map(async (classObj) => {
        const weekdays = await Class_Weekday.findAll({
            where: {
                id_class: classObj.id_class
            }
        });

        return {
            ...classObj.dataValues,
            class_weekdays: weekdays
        }
    });
    
    const result = await Promise.all(promises);
    return result
}


const getStudentClasses = async(id_student) => {
    const [results, metadata] = await sequelize.query(`select c.* from class c join class_student cs on cs.id_class = c.id_class
     join student s on s.id_student = cs.id_student where cs.id_student = ${id_student};`);

    const promises = results.map(async (classObj) => {

        const weekdays = await Class_Weekday.findAll({
            where: {
                id_class: classObj.id_class
            }
        });
        return {
            ...classObj,
            class_weekdays: weekdays
        }
    });

    const result = await Promise.all(promises);
    return result;
}


exports.addClass = async(req,res,next) => {
    const {name, code, semester, id_teacher, id_course, class_weekdays} = req.body
    try {
        const classObj = await Class.create({name, code, semester, id_teacher, id_course});
        const promises = class_weekdays.map(async (class_weekday) => {
            const {weekday, start_hour, end_hour} = class_weekday;
            return await Class_Weekday.create({id_class: classObj.id_class, weekday, start_hour, end_hour});
        });
        await Promise.all(promises).then((values) => {
            
            res.status(200).json({...classObj.dataValues , class_weekdays: values});
        });
    } catch {
        res.status(500).json({error: "An error occurred while adding a class"});
    } 
}

exports.assignStudent = async(req,res,next) => {
    const {id_student, id_class} = req.body
    try{
        const ClassStudent = await Class_Student.create({id_student,id_class});

        return res.status(200).json(ClassStudent);
    } catch {
        res.status(500).json({error: "An error occurred while adding the student to the class"});
    }
}

exports.editClass = async (req, res, next) => {
  const classId = req.params.id;
  const { name, code, semester, id_teacher, id_course } = req.body;

  try {
    const classToUpdate = await Class.findByPk(classId);

    if (!classToUpdate) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }

    if (name) classToUpdate.name = name;
    if (code) classToUpdate.code = code;
    if (semester) classToUpdate.semester = semester;
    if (id_teacher) classToUpdate.id_teacher = id_teacher;
    if (id_course) classToUpdate.id_course = id_course;

    await classToUpdate.save();

    res.status(200).json(classToUpdate);
  } catch (error) {
    console.error('Erro ao atualizar a turma:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a turma' });
  }
};


exports.removeClass = async (req, res, next) => {
    const { id } = req.params;

    try {

    await Class_Weekday.destroy({
        where: {
            id_class: id
        }
    });

    await Class_Student.destroy({
        where: {
            id_class: id
        }
    });

    await Class.destroy({
        where: {
            id_class: id
        }
    })

    return res.status(204).json({message: "Successfuly deleted Class"});
    } catch {
        res.status(500).json({error: "An error occurred while deleting the class"});
    }
}

exports.getStudentsByClassID = async (req, res, next) => {
    const { id_class } = req.query;
    try{
        const [results, metadata] = await sequelize.query(`select s.*, u.name, count(a.id_attendance) as count from student s LEFT JOIN attendance a on a.id_student = s.id_student and a.validation = true
        join class_student cs on cs.id_student = s.id_student JOIN user u on u.id_user = s.id_student where cs.id_class = ${id_class}
        group by s.id_student;`);

        const [count] = await sequelize.query(`select count(1) as count from attendance_roll where id_class = ${id_class} and start_datetime < now();`)

        const students = results.map((student) => {
            return {
                ...student,
                attendancePercentage: count[0].count ? (student.count/count[0].count) * 100 : 100
            }
        });

        res.status(200).json(students);
    } catch {
        res.status(500).json({error: "An error occurred while getting students"});
    }

}

exports.getClassStats = async (req, res, next) => {
    const { id_class } = req.query;
    try{
        const count = await countStudentsInClass(id_class);

        const [attendanceCount] = await sequelize.query(`select count(1) as count from attendance a join attendance_roll ar on ar.id_attendance_roll = a.id_attendance_roll where ar.id_class = ${id_class} and a.validation = true;`);
        const [attendanceRollCount] = await sequelize.query(`select count(1) as count from attendance_roll where id_class = ${id_class} and (end_datetime < now() or end_datetime is null) and start_datetime < now()`);

        const result = {
            totalStudents: count,
            attendancePercentage: attendanceRollCount[0].count ? (attendanceCount[0].count/attendanceRollCount[0].count) : 0
        }

        return res.status(200).json(result);
    } catch {
        res.status(500).json({error: "An error occurred while getting class stats"});
    }
}


const countStudentsInClass = async (id_class) => {
    try {
        const [result] = await sequelize.query(`select COUNT(1) as count from student s join class_student cs on cs.id_student = s.id_student where cs.id_class = ${id_class};`);
        const students = result[0].count;


        return students;
    } catch {
        return 0;
    }
}

exports.countStudentsInClass = countStudentsInClass;
