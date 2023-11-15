const { Attendance, Attendance_roll, Class, Class_Student, Class_Weekday } = require('../models/models');
const { Op, DATE } = require('sequelize');
const sequelize = require('../util/database');

exports.createAttendance = async(req, res, next) => {
    const {medical_certificate, id_attendance_roll, id_student} = req.body

    try {
        const hour = new Date().getHours();
        const minutes = new Date().getMinutes();
        const attendance = await Attendance.create({
            hour : `${hour}:${minutes}`,
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
        studentAttendancesDetails.forEach(async (attendance) => {
            const classStartTime = new Date(attendance.start_datetime);
            const attendanceHour = attendance.hour.split(':');
            const attendanceTime = new Date(0, 0, 0, attendanceHour[0], attendanceHour[1]);

            const delay = ((attendanceTime.getHours() - classStartTime.getHours()) / 60) + (attendanceTime.getMinutes() - classStartTime.getMinutes()); // Convertendo para min
            totalAbsenceTime += delay;
        });
        
        const weekdays = await Class_Weekday.findAll({
            where: { id_class }
        });


        const averageClassTime = (weekdays.reduce((acc, weekday) => {
          const weekdayStartHour = weekday.dataValues.start_hour.split(':');
          const weekdayEndHour = weekday.dataValues.end_hour.split(':');
          const startHour = new Date(0, 0, 0, weekdayStartHour[0], weekdayStartHour[1]);
          const endHour = new Date(0, 0, 0, weekdayEndHour[0], weekdayEndHour[1]);

          return acc + (endHour - startHour);
        }, 0)/weekdays.length)/60000;

        // Tempo medio de ausencia
        let averageAbsenceTime = averageClassTime;
        if (studentAttendancesDetails.length > 0) {
            averageAbsenceTime = totalAbsenceTime / studentAttendancesDetails.length;
        }

        // Tempo medio de presenca
        const averagePresenceTime = averageClassTime - averageAbsenceTime;

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
