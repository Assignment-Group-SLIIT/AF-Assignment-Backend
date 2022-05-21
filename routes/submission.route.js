const express = require('express');
const router = express.Router();

let submissionControlller = require('../controllers/submission.controller');

router.post('/', submissionControlller.addSubmission);
router.get('/', submissionControlller.getAllSubmissions);
router.get('/:id', submissionControlller.updateSubmission);

module.exports = router;