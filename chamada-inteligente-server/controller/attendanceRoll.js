const sequelize = require('../util/database');
const { Attendance_roll } = require('../models/models');
const { Op } = require('sequelize'); 
const { countStudentsInClass } = require('./class');

exports.createAttendanceRoll = async (req,res,next) =>{
    const {id_class, start_datetime, end_datetime} = req.body;

    const attendanceRollDatetime = start_datetime ? new Date(start_datetime) : new Date();
    const attendanceRoll = await Attendance_roll.create({
        id_class,
        start_datetime: attendanceRollDatetime,
        end_datetime
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

exports.getAttendeesByAttendanceRoll = async (req, res, next) => {
    const { id_attendance_roll, id_class } = req.query;
    try{
        const presentStudents = await getAllPresentStudentsFromAttendenceRoll(id_attendance_roll);
        const vacantStudents = await getAllVacantStudentsFromAttendenceRoll(id_attendance_roll,id_class);

        const mappedPresentStudents = presentStudents.map((student)=>{
            return {
                ...student,
                present: true
            }
        })

        const mappedVacantStudents = vacantStudents.map((student)=>{
            return {
                ...student,
                present: false
            }
        })

        const response = mappedPresentStudents.concat(mappedVacantStudents);

        return res.status(200).json(response)
    } catch {
        res.status(500).json({error: "An error occurred while getting attendences"});
    }

    
}

const getAllPresentStudentsFromAttendenceRoll = async (id_attendance_roll) => {
    const [results, metadata] = await sequelize.query(`SELECT s.* FROM student s JOIN attendance a ON s.id_student = a.id_student WHERE a.id_attendance_roll = ${id_attendance_roll}`);

    return results;
}

const getAllVacantStudentsFromAttendenceRoll = async (id_attendance_roll,id_class) => {
    const [results, metadata] = await sequelize.query(`SELECT s.* FROM student s LEFT JOIN class_student cs ON s.id_student = cs.id_student JOIN class c ON cs.id_class = c.id_class
    LEFT JOIN attendance a ON s.id_student = a.id_student AND a.id_attendance_roll = ${id_attendance_roll} WHERE c.id_class = ${id_class} AND a.id_attendance_roll IS NULL;`);

    return results;
}

exports.getAllScheduledAttendance = (req, res, next) => {
    const { id_class } = req.params;

    Attendance_roll.findAll({
        where: {
            id_class: id_class,
            start_datetime: {
                [Op.gt]: new Date() // seleciona chamadas com data/hora superior ao atual
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

exports.getAttendanceRollHistory = async (req, res, next) => {
    const { id_class } = req.query;
    try{
        
        const [results, metadata] = await sequelize.query(`SELECT ar.*, COUNT(a.id_student) as present_students FROM attendance_roll ar 
        LEFT JOIN attendance a ON ar.id_attendance_roll = a.id_attendance_roll 
        WHERE ar.id_class = ${id_class} AND ar.start_datetime < NOW() GROUP BY ar.id_attendance_roll`);

        const count = await countStudentsInClass(id_class);
        
        const mappedResults = results.map((result)=>{
            return {
                ...result,
                percentage: (result.present_students/count)*100
            }
        })
        
        res.status(200).json(mappedResults);

    } catch {error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o histórico de chamadas' });
        };

    }
}


