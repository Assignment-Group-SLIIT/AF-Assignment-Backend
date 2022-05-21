const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    groupId: { type: String, required: true },
    submissionId: { type: String, required: true },
    submissionType: { type: String, required: true },
    document: { type: String, required: true },
    evaluationStatus: { type: String, required: true },
    marks: { type: Number, required: true }
})

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;