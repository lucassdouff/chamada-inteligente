const express = require('express')
const router = express.Router();

const attendanceController = require('../controller/attendance');

router.post('/', attendanceController.createAttendance);
router.get('/attendanceRoll/:attendanceRollId/attendances', attendanceController.getAllAttendances);
router.get('/attendance/class/:classId', attendanceController.listAttendanceForClass);
router.get('/stats/:id_class/:id_student', attendanceController.getStudentAttendanceStats);
router.put('/', attendanceController.updateAttendances);


module.exports = router;