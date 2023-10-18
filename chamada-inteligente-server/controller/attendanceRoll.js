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
        where: { id_attendance_roll: id },
    })
    .then(() => {
        res.status(204).send();
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o attendanceRoll' });
    });
}

exports.getUpcomingAttendanceRolls = (req, res, next) => {
    const { id_class } = req.params;

    Attendance_roll.findAll({
        where: {
            id_class: id_class,
            datetime: {
                [sequelize.Op.gt]: new Date() // seleciona chamadas com data/hora superior ao atual
            }
        }
    })
    .then(attendanceRolls => {
        res.status(200).json(attendanceRolls);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar as chamadas agendadas' });
    });
}
