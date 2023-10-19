const express = require('express')
const router = express.Router();

const attendanceRollController = require('../controller/attendanceRoll');

router.post('/', attendanceRollController.createAttendanceRoll);
router.delete('/:id', attendanceRollController.deleteAttendanceRoll);
router.get('/upcoming/:id_class', attendanceRollController.getAllScheduledAttendance);

module.exports = router;