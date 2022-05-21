const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectProposalSchema = new Schema({
    groupId: { type: String, required: true },
    leaderEmail: { type: String, required: true },
    researchTopic: { type: String, required: true },
    field: { type: String, required: true },
    document: { type: String, required: true },
})

const ProjectProposal = mongoose.model('ProjectProposal', projectProposalSchema);
module.exports = ProjectProposal;