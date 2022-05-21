const express = require('express');
const router = express.Router();

let projectProposal = require('../controllers/projectProposal.controller');

router.post('/', projectProposal.createproposal);
router.get('/', projectProposal.getAllproposal);
router.get('/:id', projectProposal.getOneproposal);
router.put('/:id', projectProposal.updateproposal);
router.delete('/:id', projectProposal.deleteproposal);

module.exports = router;