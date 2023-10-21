const express = require('express')
const router = express.Router();

const classController = require('../controller/class');

router.post('/', classController.addClass);
router.get('/', classController.getClasses);
router.post('/assignStudent', classController.assignStudent);
router.put('/:id', classController.editClass);
router.delete('/:id', classController.removeClass);
router.get('/historyLessons/:id', classController.historyLessons);

module.exports = router;