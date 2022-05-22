const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    submissionId: { type: String, required: true },
    submissionType: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    markingSchema: { type: String, required: true },
})

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;