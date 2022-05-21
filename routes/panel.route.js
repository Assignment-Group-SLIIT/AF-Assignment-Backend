const express = require('express');
const router = express.Router();

let panelController = require('../controllers/submission.controller');

router.post('/', panelController.addSubmission);


module.exports = router;