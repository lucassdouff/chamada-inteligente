const express = require('express')
const router = express.Router();

const userController = require('../controller/user');

router.post('/addTeacher', userController.addTeacher);
router.post('/addStudent', userController.addStudent);
router.get('/login', userController.login);

module.exports = router;