const express = require('express');
const router = express.Router();

let templatesController = require('../controllers/template.controller');

router.post('/', templatesController.createTemplate);
router.get('/', templatesController.getAllTemplate);
router.get('/:id', templatesController.getOneTemplate);
router.put('/:id', templatesController.updateTemplate);
router.delete('/:id', templatesController.deleteTemplate);

module.exports = router;