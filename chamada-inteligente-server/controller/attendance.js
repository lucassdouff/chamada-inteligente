const { Attendance, Attendance_roll, Class } = require('../models/models');

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

exports.getStudentAttendanceStats = async (req, res, next) => {
    const { id_class, id_student } = req.params;

    try {
        // Contar quantos Attendance_roll existem para a class (quantas aulas ja ocorreram)
        const totalClassSessions = await Attendance_roll.count({
            where: { id_class }
        });

        // Buscar todas as Attendance do aluno para essa class com detalhes do Attendance_roll
        const studentAttendancesDetails = await Attendance.findAll({
            where: { id_student },
            include: [{
                model: Attendance_roll,
                attributes: ['datetime'],
                required: true, // Inner join
                where: { id_class }
            }]
        });        

        // Calcular o tempo total de ausencia do aluno
        let totalAbsenceTime = 0;
        studentAttendancesDetails.forEach(attendance => {
            const classStartTime = new Date(attendance.Attendance_roll.datetime);

            // Convertendo Sequelize.TIME para uma data js
            const [hours, minutes] = attendance.hour.split(':').map(Number);
            const studentArrivalDate = new Date(classStartTime);
            studentArrivalDate.setHours(hours, minutes);

            const delay = (studentArrivalDate - classStartTime) / 60000; // Convertendo para min
            totalAbsenceTime += delay;
        });

        // Buscar detalhes da class (especificamente a duração)
        const classDetails = await Class.findByPk(id_class);

        // Tempo medio de ausencia
        let averageAbsenceTime = 0;
        if (studentAttendancesDetails.length > 0) {
            averageAbsenceTime = totalAbsenceTime / studentAttendancesDetails.length;
        }

        // Tempo medio de presenca
        const averagePresenceTime = classDetails.duration - averageAbsenceTime;

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
