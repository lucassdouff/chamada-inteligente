const { Attendance, Attendance_roll, Class, Class_Student } = require('../models/models');
const { Op, DATE } = require('sequelize');
const sequelize = require('../util/database');

exports.createAttendance = async(req, res, next) => {
    const {medical_certificate, id_attendance_roll, id_student} = req.body

    try {
        const datetime = new Date().getHours();
        const minutes = new Date().getMinutes();
        const attendance = await Attendance.create({
            hour : `${datetime}:${minutes}`,
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

exports.getStudentAttendanceStats = async (req, res, next) => {
    const { id_class, id_student } = req.params;

    try {
        // Contar quantos Attendance_roll existem para a class (quantas aulas ja ocorreram)
        const totalClassSessions = await Attendance_roll.count({
            where: { id_class }
        });

        // Buscar todas as Attendance do aluno para essa class com detalhes do Attendance_roll
        const response = await sequelize.query(`Select a.*, ar.start_datetime from attendance a 
        join attendance_roll ar on a.id_attendance_roll = ar.id_attendance_roll where a.id_student = ${id_student} and ar.id_class = ${id_class} and a.validation = true`);

        const studentAttendancesDetails = response[0];

        // Calcular o tempo total de ausencia do aluno
        let totalAbsenceTime = 0;
        studentAttendancesDetails.forEach(attendance => {
            const classStartTime = new Date(attendance.start_datetime);

            const delay = (attendance.hour - classStartTime) / 60000; // Convertendo para min
            totalAbsenceTime += delay;
        });

        // Buscar detalhes da class (especificamente a duração)
        const classDetails = await Class.findByPk(id_class);

        // Tempo medio de ausencia
        let averageAbsenceTime = (classDetails.duration * 60);
        if (studentAttendancesDetails.length > 0) {
            averageAbsenceTime = totalAbsenceTime / studentAttendancesDetails.length;
        }

        // Tempo medio de presenca
        const averagePresenceTime = (classDetails.duration * 60) - averageAbsenceTime;

        // Percentual de faltas
        const absencePercentage = totalClassSessions ? ((totalClassSessions - studentAttendancesDetails.length) / totalClassSessions) * 100 : 0;

        // Total de faltas
        const totalAbsences = totalClassSessions - studentAttendancesDetails.length;

        res.status(200).json({
            averagePresenceTime,
            absencePercentage,
            totalAbsences
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas de presença do aluno' });
    }
}

exports.updateAttendances = async (req, res, next) => {
  const { attendance_roll, id_attendance_roll } = req.body;

  try {
    const promises = attendance_roll.map((attendance) => {
      const { id_student, id_attendance, present} = attendance;

      if (id_attendance) {
        return Attendance.update(
          { validation: present },
          { where: { id_attendance, id_student } }
        );
      } else {
        return Attendance.create({
          id_student,
          id_attendance_roll,
          validation: present,
        });
      }
    });

    await Promise.all(promises);

    res.status(200).json({ message: 'Presença atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar presença' });
  }

}
