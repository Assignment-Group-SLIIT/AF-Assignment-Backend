const express = require('express');
const router = express.Router();

let groupController = require('../controllers/group.controller');


router.post('/',groupController.createGroup)

module.exports = router;