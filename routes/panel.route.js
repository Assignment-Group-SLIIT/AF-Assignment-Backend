const express = require('express');
const router = express.Router();

let panelController = require('../controllers/panel.controller');

router.post('/', panelController.addPanel);
router.get('/', panelController.getAllSubmissions);
router.put('/:id', panelController.updateSubmission);

module.exports = router;