const express = require('express');
const router = express.Router();

const departmentController = require('../controller/department');

router.get('/', departmentController.getAllDepartment);
router.get('/ByName', departmentController.getDepartmentByName);
router.get('/ById', departmentController.getDepartmentById);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/t:id', departmentController.deleteDepartment);

module.exports = router;