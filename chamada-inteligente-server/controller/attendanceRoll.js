const sequelize = require('../util/database');
const { Attendance_roll } = require('../models/models'); 

exports.createAttendanceRoll = (req,res,next) =>{
    const {id_class, datetime} = req.body;

    const attendanceRollDatetime = datetime ? new Date(datetime) : new Date();
    const attendanceRoll = Attendance_roll.create({
        id_class,
        datetime: attendanceRollDatetime
    })

    return res.status(200).json(attendanceRoll);
}

exports.deleteAttendanceRoll = (req, res, next) => {
    const { id } = req.params; 
    Attendance_roll.destroy({
        where: { id },
    })
    .then(() => {
        res.status(204).send();
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o attendanceRoll' });
    });
}