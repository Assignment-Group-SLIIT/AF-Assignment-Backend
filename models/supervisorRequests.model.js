const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestTopicSupervisor = new Schema({

    groupId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    researchTopic: {
        type: String,
        required: true,
    },
    researchField: {
        type: String,
        required: true,
    },
    supervisor: {
        type: String,
        required: true,
    }

});



const SupervisorRequest = mongoose.model("requestTopicSupervisor", RequestTopicSupervisor);

module.exports = SupervisorRequest;