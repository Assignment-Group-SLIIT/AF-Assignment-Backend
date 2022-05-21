"use strict";

var CoSupervisorRequest = require('../models/cosupervisorRequests.model');

var createCoSupervisorRequest = function createCoSupervisorRequest(req, res) {
  var groupId, email, researchTopic, researchField, coSupervisor, newCoSupervisorRequest, response;
  return regeneratorRuntime.async(function createCoSupervisorRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          groupId = req.body.groupId;
          email = req.body.email;
          researchTopic = req.body.researchTopic;
          researchField = req.body.researchField;
          coSupervisor = req.body.coSupervisor;
          newCoSupervisorRequest = new CoSupervisorRequest({
            groupId: groupId,
            email: email,
            coSupervisor: coSupervisor,
            researchTopic: researchTopic,
            researchField: researchField,
            panelNo: panelNo
          });
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(newCoSupervisorRequest.save());

        case 9:
          response = _context.sent;

          if (!response) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: "Register topic to co-supervisor"
          }));

        case 14:
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](6);
          return _context.abrupt("return", res.status(400).send({
            message: 'error while register topic'
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 17]]);
};

module.exports = {
  createCoSupervisorRequest: createCoSupervisorRequest
};
//# sourceMappingURL=cosupervisorRequests.controller.dev.js.map
