const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department');

router.get('/department', departmentController.getAllDepartment);
router.get('/departmentByName', departmentController.getDepartmentByName);
router.get('/departmentById', departmentController.getDepartmentById);
router.post('/department', departmentController.createDepartment);
router.put('/department/:id', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;