const express = require('express')
const router = express.Router();

const classController = require('../controller/class');

router.post('/addClass', classController.addClass);
router.get('/getClasses', classController.getClasses);
router.post('/assignStudent', classController.assignStudent);
router.put('/classes/:id', classController.editClass);

module.exports = router;