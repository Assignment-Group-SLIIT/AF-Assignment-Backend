const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId : {
        type : String,
        required : true,
    },

    student : {
       
    },
    
    researchTopic : {
        type : String,
        required : true,
    },

    researchField : {
        type : String,
        required : true,
    },

    supervisor : {
        type : String,
        required : true,
    },

    coSupervisor : {
        type : String,
        required : true,
    }, 
    
    panelNo : {
        type : String,
        required : true,
    }

})

const Group = mongoose.model('Group' , groupSchema);
module.exports = Group;