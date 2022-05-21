"use strict";

var express = require('express');

var router = express.Router();

var coSupervisorRequest = require('../controllers/cosupervisorRequests.controller');

router.post('/', coSupervisorRequest.createCoSupervisorRequest);
router.get('/', coSupervisorRequest.getAllRequestTopic);
router.get('/:name', coSupervisorRequest.getAllRequestsofCoSupervisor);
router.get('/groups/:id', coSupervisorRequest.getOneRequest);
router.put('/:id', coSupervisorRequest.updateCoSupervisorRequest);
router["delete"]('/:id', coSupervisorRequest.deleteCoSupervisorRequest);
module.exports = router;
//# sourceMappingURL=cosupervisorRequests.route.dev.js.map
