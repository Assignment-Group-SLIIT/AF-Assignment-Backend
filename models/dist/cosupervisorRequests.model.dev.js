"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var coSupervisorRequestSchema = new Schema({
  groupId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  researchTopic: {
    type: String,
    required: true
  },
  researchField: {
    type: String,
    required: true
  },
  coSupervisor: {
    type: String,
    required: true
  }
});
var CoSupervisorRequest = mongoose.model('requesttopiccosupervisors', coSupervisorRequestSchema);
module.exports = CoSupervisorRequest;
//# sourceMappingURL=cosupervisorRequests.model.dev.js.map
