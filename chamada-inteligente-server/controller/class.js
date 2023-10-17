const sequelize = require('../util/database');
const { Class, Class_Student } = require('../models/models'); 


exports.addClass = async(req,res,next) => {
    const {name, class_schedule, code, duration, semester, id_teacher, id_course} = req.body
    try {

        const class_ = await Class.create({name, class_schedule, code, duration, semester, id_teacher, id_course});
        return res.status(200).json(class_);

    } catch {
        res.status(500).json({error: "An error occurred while adding a class"});
    } 
}
