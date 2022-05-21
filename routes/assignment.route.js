const express = require('express');
const router = express.Router();

let assignment = require('../controllers/assignment.controller');

router.post('/', assignment.createAssignment);
router.get('/', assignment.getAllAssignment);
router.get('/:id', assignment.getOneAssignment);
router.put('/:id', assignment.updateAssignment);
router.delete('/:id', assignment.deleteAssignment);

module.exports = router;