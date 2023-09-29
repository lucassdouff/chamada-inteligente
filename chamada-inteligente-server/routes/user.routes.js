const express = require('express')
const router = express.Router();

const userController = require('../controller/user');

router.get('/user', userController.addUser);

module.exports = router;