const express = require('express');
const router = express.Router();

let assignmentController = require('../controllers/assignment.controller');

router.post('/', assignmentController.createAssignment);
router.get('/', assignmentController.getAllAssignment);
router.get('/:id', assignmentController.getAllAssignmentForGroup);
router.put('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);
router.post('/email', assignmentController.sendPresentationEmail);

module.exports = router;