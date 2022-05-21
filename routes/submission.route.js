const express = require('express');
const router = express.Router();

let submissionControlller = require('../controllers/submission.controller');

router.post('/', submissionControlller.addSubmission);
router.get('/', submissionControlller.getAllSubmissions);
router.put('/:id', submissionControlller.updateSubmission);
router.delete('/:id', submissionControlller.deleteSubmission);

module.exports = router;