const express = require('express');
const router = express.Router();

const courseController = require('../controller/course');

router.get('/', courseController.getAllCourse);
router.get('/ByName', courseController.getCourseByName);
router.get('/ByNameDepartment', courseController.getCourseByNameDepartment);
router.get('/ById', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;