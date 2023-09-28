const express = require('express')
const router = express.Router();

const departamentoController = require('../controller/departamento');

router.get('/departamento', departamentoController.addDepartamento);

module.exports = router;