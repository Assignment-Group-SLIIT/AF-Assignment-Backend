const express = require('express');
const router = express.Router();

let coSupervisorRequest = require('../controllers/cosupervisorRequests.controller');

router.post('/' , coSupervisorRequest.createCoSupervisorRequest)
router.get('/' , coSupervisorRequest.getAllRequestTopic)
router.get('/:name',coSupervisorRequest.getAllRequestsofCoSupervisor)
router.get('/groups/:id',coSupervisorRequest.getOneRequest)
router.put('/:id',coSupervisorRequest.updateCoSupervisorRequest)
router.delete('/:id',coSupervisorRequest.deleteCoSupervisorRequest)

module.exports = router;