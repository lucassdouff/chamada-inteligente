const express = require('express')
const router = express.Router();

const attendanceController = require('../controller/attendance');

router.post('/addAttendance', attendanceController.createAttendance);
router.get('/attendanceRoll/:attendanceRollId/attendances', attendanceController.getAllAttendances);


module.exports = router;