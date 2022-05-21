const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coSupervisorRequestSchema = new Schema({
    groupId : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    researchTopic : {
        type : String,
        required : true,
    },

    researchField : {
        type : String,
        required : true,
    },

    coSupervisor : {
        type : String,
        required : true,
    }, 

})

const CoSupervisorRequest = mongoose.model('requesttopiccosupervisors' , coSupervisorRequestSchema);
module.exports = CoSupervisorRequest;