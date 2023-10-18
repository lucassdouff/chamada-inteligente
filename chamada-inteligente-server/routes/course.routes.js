const express = require('express');
const router = express.Router();

const courseController = require('../controller/course');

router.get('/getCourses', courseController.getAllCourse);
router.get('/ByName', courseController.getCourseByName);
router.get('/ByNameDepartment', courseController.getCourseByNameDepartment);
router.get('/ById', courseController.getCourseById);
router.post('/addCourse', courseController.createCourse);
router.put('/updateCourse/:id', courseController.updateCourse);
router.delete('/deleteCourse/:id', courseController.deleteCourse);

module.exports = router;