const express = require('express')
const router = express.Router();

const classController = require('../controller/class');

router.post('/', classController.addClass);
router.get('/', classController.getClasses);
router.get('/students', classController.getStudentsByClassID);
router.get('/stats', classController.getClassStats);
router.post('/assignStudent', classController.assignStudent);
router.put('/:id', classController.editClass);
router.delete('/:id', classController.removeClass);

module.exports = router;