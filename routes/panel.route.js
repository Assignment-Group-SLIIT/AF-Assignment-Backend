const express = require('express');
const router = express.Router();

let panelController = require('../controllers/panel.controller');

router.post('/', panelController.addPanel);
router.get('/', panelController.getAllPanels);
router.put('/:id', panelController.updatePanel);
router.delete('/:id', panelController.deletepanel);
router.get('/:id', panelController.getOnePanel);

module.exports = router;