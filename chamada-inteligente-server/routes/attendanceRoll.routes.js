const express = require('express')
const router = express.Router();

const attendanceRollController = require('../controller/attendanceRoll');

router.post('/', attendanceRollController.createAttendanceRoll);


module.exports = router;