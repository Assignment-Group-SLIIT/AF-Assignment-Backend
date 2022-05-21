"use strict";

var express = require('express');

var router = express.Router();

var coSupervisorRequest = require('../controllers/cosupervisorRequests.controller');

router.post('/', coSupervisorRequest.createCoSupervisorRequest);
router.get('/', coSupervisorRequest.getAllRequestTopic);
router.get('/:id', coSupervisorRequest.getAllRequestsofCoSupervisor);
router.put('/:id', coSupervisorRequest.updateCoSupervisorRequest); // router.put('/:id',coSupervisorRequest.deleteCoSupervisorRequest)

module.exports = router;
//# sourceMappingURL=cosupervisorRequests.route.dev.js.map
