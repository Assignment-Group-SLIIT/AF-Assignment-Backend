const express = require('express');
const router = express.Router();

let assignmentController = require('../controllers/assignment.controller');
console.log("route")
router.post('/', assignmentController.createAssignment);
router.get('/', assignmentController.getAllAssignment);
router.put('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;