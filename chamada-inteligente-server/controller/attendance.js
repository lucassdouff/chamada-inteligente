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

const { Class_Student, Attendance } = require('../models/models');

exports.listAttendanceForClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const studentsInClass = await Class_Student.findAll({
      where: {
        id_class: classId,
      },
    });

    const studentIds = studentsInClass.map((student) => student.id_student);

    const attendanceList = await Attendance.findAll({
      where: {
        id_student: studentIds,
      },
    });

    res.json(attendanceList);
  } catch (error) {
    console.error("Erro ao buscar a presença dos alunos na turma: ", error);
    res.status(500).json({ error: "Erro ao buscar a presença dos alunos na turma" });
  }
};
