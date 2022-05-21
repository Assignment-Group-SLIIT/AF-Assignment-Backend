const express = require('express');
const router = express.Router();

let supervisorRequestsController = require('../controllers/supervisorRequests.controller');

router.post('/', supervisorRequestsController.createSupervisorRequest);
router.get('/:name', supervisorRequestsController.getAllRequestsofSupervisor);


module.exports = router;