const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId: {
        type: String,
        required: true,
    },

    student: {

    },

    researchTopic: {
        type: String,
        required: false,
    },

    researchField: {
        type: String,
        required: false,
    },

    supervisor: {
        type: String,
        required: false,
    },

    coSupervisor: {
        type: String,
        required: false,
    },

    panelNo: {
        type: String,
        required: false,
    }

})

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;