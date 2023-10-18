const express = require('express');
const router = express.Router();

const departmentController = require('../controller/department');

router.get('/getDepartments', departmentController.getAllDepartment);
router.get('/ByName', departmentController.getDepartmentByName);
router.get('/ById', departmentController.getDepartmentById);
router.post('/addDepartment', departmentController.createDepartment);
router.put('/updateDepartment/:id', departmentController.updateDepartment);
router.delete('/deleteDepartmen/t:id', departmentController.deleteDepartment);

module.exports = router;