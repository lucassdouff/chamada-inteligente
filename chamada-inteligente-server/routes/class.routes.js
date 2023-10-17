const express = require('express')
const router = express.Router();

const classController = require('../controller/class');

router.post('/addClass', classController.addClass);


module.exports = router;