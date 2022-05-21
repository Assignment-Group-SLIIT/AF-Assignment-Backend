const express = require('express');
const router = express.Router();

let supervisorRequestsController = require('../controllers/supervisorRequests.controller');

router.post('/', supervisorRequestsController.createSupervisorRequest);
router.get('/', supervisorRequestsController.getAllRequests);
router.get('/:name', supervisorRequestsController.getAllRequestsofSupervisor);
router.put('/:id', supervisorRequestsController.updateSupervisorRequest);
router.delete('/:id', supervisorRequestsController.deleteSupervisorRequest);


module.exports = router;