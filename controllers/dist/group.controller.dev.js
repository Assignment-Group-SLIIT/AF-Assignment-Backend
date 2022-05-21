"use strict";

var Group = require('../models/group.model');

var createGroup = function createGroup(req, res) {
  var groupId, student, supervisor, coSupervisor, researchTopic, researchField, panelNo, newGroup, response;
  return regeneratorRuntime.async(function createGroup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          groupId = req.body.groupId;
          student = req.body.student;
          supervisor = req.body.supervisor;
          coSupervisor = req.body.coSupervisor;
          researchTopic = req.body.researchTopic;
          researchField = req.body.researchField;
          panelNo = req.body.panelNo;
          newGroup = new Group({
            groupId: groupId,
            student: student,
            supervisor: supervisor,
            coSupervisor: coSupervisor,
            researchTopic: researchTopic,
            researchField: researchField,
            panelNo: panelNo
          });
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(newGroup.save());

        case 11:
          response = _context.sent;

          if (!response) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: "new student group created"
          }));

        case 16:
          return _context.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 17:
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](8);
          return _context.abrupt("return", res.status(400).send({
            message: 'error while adding a group'
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 19]]);
};

module.exports = {
  createGroup: createGroup
};
//# sourceMappingURL=group.controller.dev.js.map
