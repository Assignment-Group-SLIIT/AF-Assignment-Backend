"use strict";

var Group = require('../models/group.model'); //register group with supervisors


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
}; //get all registered group 


var getAllGroup = function getAllGroup(req, res) {
  var response;
  return regeneratorRuntime.async(function getAllGroup$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Group.find());

        case 3:
          response = _context2.sent;

          if (!response) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(200).send({
            message: "get all registered group",
            data: response
          }));

        case 8:
          return _context2.abrupt("return", res.status(500).send({
            message: "Internal server error"
          }));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(400).send({
            message: "error while getting all group"
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; //remove group


var removeGroup = function removeGroup(req, res) {
  var groupId, response;
  return regeneratorRuntime.async(function removeGroup$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          groupId = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Group.findOneAndDelete({
            groupId: groupId
          }));

        case 4:
          response = _context3.sent;

          if (!response) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(204).send({
            message: 'Successfully deleted a Group'
          }));

        case 9:
          return _context3.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 10:
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(400).send({
            message: 'Could not delete the Group'
          }));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; //get on group by group Id


var getOneGroup = function getOneGroup(req, res) {
  var groupId, response;
  return regeneratorRuntime.async(function getOneGroup$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          groupId = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Group.findOne({
            groupId: groupId
          }));

        case 4:
          response = _context4.sent;

          if (!response) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.json(response));

        case 9:
          return _context4.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 10:
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(404).send({
            message: 'No such request available'
          }));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; //update group details by group Id


var updateGroup = function updateGroup(req, res) {
  var groupId, updateGroup, response;
  return regeneratorRuntime.async(function updateGroup$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          groupId = req.params.id;
          updateGroup = {
            groupId: req.body.groupId,
            student: req.body.student,
            supervisor: req.body.supervisor,
            coSupervisor: req.body.coSupervisor,
            researchTopic: req.body.researchTopic,
            researchField: req.body.researchField,
            panelNo: req.body.panelNo
          };
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Group.findOneAndUpdate({
            groupId: groupId
          }, updateGroup));

        case 5:
          response = _context5.sent;

          if (!response) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(200).send({
            message: 'Successfully updated group request'
          }));

        case 10:
          return _context5.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 11:
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](2);
          return _context5.abrupt("return", res.status(400).send({
            message: 'Unable to update group request'
          }));

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 13]]);
};

module.exports = {
  createGroup: createGroup,
  getAllGroup: getAllGroup,
  removeGroup: removeGroup,
  getOneGroup: getOneGroup,
  updateGroup: updateGroup
};
//# sourceMappingURL=group.controller.dev.js.map
