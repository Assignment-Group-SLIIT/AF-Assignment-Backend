const express = require('express');
const router = express.Router();

let projectProposal = require('../controllers/projectProposal.controller');

router.post('/', projectProposal.createProjectProposal);
router.get('/', projectProposal.getAllProjectProposal);
// router.get('/:id', projectProposal.getOneproposal);
router.put('/:id', projectProposal.updateProjectProposal);
router.delete('/:id', projectProposal.deleteProjectProposal);

module.exports = router;