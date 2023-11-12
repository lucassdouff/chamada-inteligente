const express = require('express')
const router = express.Router();

const attendanceRollController = require('../controller/attendanceRoll');

router.post('/', attendanceRollController.createAttendanceRoll);
router.put("/end", attendanceRollController.endAttendanceRoll);
router.delete('/:id', attendanceRollController.deleteAttendanceRoll);
router.get('/atendees',attendanceRollController.getAttendeesByAttendanceRoll);
router.get('/history/student',attendanceRollController.getStudentAttendanceRollHistory);
router.get('/history/teacher',attendanceRollController.getTeacherAttendanceRollHistory);
router.get('/upcoming/:id_class', attendanceRollController.getAllScheduledAttendance);
router.get('/ongoing/:id_class', attendanceRollController.getOngoingAttendanceRoll);


module.exports = router;