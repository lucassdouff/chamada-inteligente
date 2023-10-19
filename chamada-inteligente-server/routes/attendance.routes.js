const express = require('express')
const router = express.Router();

const attendanceController = require('../controller/attendance');

router.post('/addAttendance', attendanceController.createAttendance);
router.get('/stats/:id_class/:id_student', attendanceController.getStudentAttendanceStats);

module.exports = router;