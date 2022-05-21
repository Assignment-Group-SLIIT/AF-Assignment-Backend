const express = require('express');
const router = express.Router();

let coSupervisorRequest = require('../controllers/cosupervisorRequests.controller');

router.post('/' , coSupervisorRequest.createCoSupervisorRequest)
router.get('/' , coSupervisorRequest.getAllRequestTopic)

module.exports = router;