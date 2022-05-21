const express = require('express');
const router = express.Router();

let supervisorRequestsController = require('../controllers/supervisorRequests.controller');

router.post('/', supervisorRequestsController.createSupervisorRequest);


module.exports = router;