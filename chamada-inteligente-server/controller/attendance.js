const sequelize = require('../util/database');
const { Attendance } = require('../models/models');
const { DATE } = require('sequelize');

exports.createAttendance = async(req, res, next) => {
    const {medical_certificate, id_attendance_roll, id_student} = req.body
    try {
        const datetime = new Date();
        const attendance = await Attendance.create({
            hour : datetime,
            validation: true,
            medical_certificate,
            id_attendance_roll,
            id_student});
        return res.status(200).json(attendance);

    } catch {
        res.status(500).json({error: "An error occurred while adding a attendance"});
    } 
}

exports.getAllAttendances = async (req, res, next) => {
  const { attendanceRollId } = req.params;

  try {
    const attendances = await Attendance.findAll({
      where: {
        id_attendance_roll: attendanceRollId,
        hour: {
          [DATE.lte]: new Date(),
        },
      },
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as chamadas abertas' });
  }
};
