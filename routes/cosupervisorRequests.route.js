const express = require('express');
const router = express.Router();

let coSupervisorRequest = require('../controllers/cosupervisorRequests.controller');

router.post('/' , coSupervisorRequest.createCoSupervisorRequest)
router.get('/' , coSupervisorRequest.getAllRequestTopic)
router.get('/:id',coSupervisorRequest.getAllRequestsofCoSupervisor)
router.put('/:id',coSupervisorRequest.updateCoSupervisorRequest)
// router.put('/:id',coSupervisorRequest.deleteCoSupervisorRequest)

module.exports = router;