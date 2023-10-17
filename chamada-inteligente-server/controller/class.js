const sequelize = require('../util/database');
const { Class, Class_Student } = require('../models/models'); 

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
        await Class_Student.create({id_student,id_class});

        return res.status(200);
    } catch {
        res.status(500).json({error: "An error occurred while adding the student to the class"});
    }
}