const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course');

router.get('/course', courseController.getAllCourse);
router.get('/courseByName', courseController.getCourseByName);
router.get('/courseByNameDepartment', courseController.getCourseByNameDepartment);
router.get('/courseById', courseController.getCourseById);
router.post('/course', courseController.createCourse);
router.put('/course/:id', courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);

module.exports = router;