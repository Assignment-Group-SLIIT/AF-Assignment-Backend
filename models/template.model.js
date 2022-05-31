const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    submissionId: { type: String, required: true },
    submissionType: { type: String, required: true },
    template: { type: String, required: true }
})

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;