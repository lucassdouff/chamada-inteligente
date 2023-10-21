const sequelize = require('../util/database');
const { Class, Class_Student, Class_Weekday , Student, Attendance, Course, Department, Attendance_roll} = require('../models/models'); 

exports.getClasses = async (req, res, next) => {
    const {id, role} = req.body
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
    return classes
}


const getStudentClasses = async(id_student) => {
    const [results, metadata] = await sequelize.query(`select c.* from class c join class_student cs on cs.id_class = c.id_class
     join student s on s.id_student = cs.id_student where cs.id_student = ${id_student};`);

    return results;
}


exports.addClass = async(req,res,next) => {
    const {name, class_schedule, code, duration, semester, id_teacher, id_course} = req.body
    try {

        const class_ = await Class.create({name, class_schedule, code, duration, semester, id_teacher, id_course});
        return res.status(200).json(class_);

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
  const { name, class_schedule, code, duration, semester, id_teacher, id_course } = req.body;

  try {
    const classToUpdate = await Class.findByPk(classId);

    if (!classToUpdate) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }

    if (name) classToUpdate.name = name;
    if (class_schedule) classToUpdate.class_schedule = class_schedule;
    if (code) classToUpdate.code = code;
    if (duration) classToUpdate.duration = duration;
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

exports.historyLessons = async (req, res, next) => {

    // `SELECT FROM attendance_roll ar WHERE ar.id_student = ${id_student}`
    const id = req.params.id;
    try{
        const getClassByStudent_ = await getClassByStudent(id);
        let getAllAttendanceRollByClasses_ = [];
        for(let i =0;i<getClassByStudent_.length;i++){
            const getAttendanceRollByClasses_ = await getAttendanceRollByClasses(getClassByStudent_[i]['id_class']);
            getAllAttendanceRollByClasses_ = getAllAttendanceRollByClasses_.concat(getAttendanceRollByClasses_);
        }
        let getAllAttendanceByAttendanceRoll_ = [];
        for(let k =0;k<getAllAttendanceRollByClasses_.length;k++){
            const getAttendanceByAttendanceRoll_ = await getAttendanceByAttendanceRoll(getAllAttendanceRollByClasses_[k]['id_attendance_roll']);
            if (getAttendanceByAttendanceRoll_.length != 0){
                getAttendanceByAttendanceRoll_[0]['id_class'] = getAllAttendanceRollByClasses_[k]['id_class'];
                getAllAttendanceByAttendanceRoll_ = getAllAttendanceByAttendanceRoll_.concat(getAttendanceByAttendanceRoll_);
            }else{
                const faltou = [
                    {
                        "hour": "Faltou", "id_attendance_roll": getAllAttendanceRollByClasses_[k]['id_attendance_roll'],
                        "id_student": id,
                        "id_class": getAllAttendanceRollByClasses_[k]['id_class']
                    } 

                ];
                getAllAttendanceByAttendanceRoll_ = getAllAttendanceByAttendanceRoll_.concat(faltou);
            }
        };  
        return res.status(200).json(getAllAttendanceByAttendanceRoll_)
    }catch{
        res.status(500).json({error: "An error occurred while getting history attendance by student"});
    }
}


const getClassByStudent = async(id_student) =>{
    const [results, metadata] = await sequelize.query(`SELECT
    cs.id_class
FROM
    class_student AS cs
WHERE
    cs.id_student = ${id_student}; `);
    return results;
}

const getAttendanceRollByClasses = async(id_class) =>{
    const [results, metadata] = await sequelize.query(`SELECT
    ar.id_attendance_roll,
    ar.id_class
FROM
    attendance_roll AS ar
WHERE
    ar.id_class = ${id_class}; `);
    return results;
}

const getAttendanceByAttendanceRoll = async(id) =>{
    const [results, metadata] = await sequelize.query(`SELECT
    a.hour,
    a.id_attendance_roll,
    a.id_student
FROM
    attendance AS a
WHERE
    a.id_attendance_roll = ${id}; `);
    return results;
}