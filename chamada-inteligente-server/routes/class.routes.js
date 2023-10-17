const express = require('express')
const router = express.Router();

const classController = require('../controller/class');

router.post('/addClass', classController.addClass);
router.post('/assignStudent', classController.assignStudent);

module.exports = router;