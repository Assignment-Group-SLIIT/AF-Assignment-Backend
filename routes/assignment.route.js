const express = require('express');
const router = express.Router();

let assignmentController = require('../controllers/assignment.controller');
console.log("route")
router.post('/', assignmentController.createAssignment);
router.get('/', assignmentController.getAllAssignment);
router.put('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);
router.post('/:id', assignmentController.updateMarks);

module.exports = router;