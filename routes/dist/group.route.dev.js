"use strict";

var express = require('express');

var router = express.Router();

var groupController = require('../controllers/group.controller');

router.post('/', groupController.createGroup);
router.get('/', groupController.getAllGroup);
module.exports = router;
//# sourceMappingURL=group.route.dev.js.map
