const express = require('express')
const router = express.Router();

const departmentController = require('../controller/department');

router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;