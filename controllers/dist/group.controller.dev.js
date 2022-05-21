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
};

var removeGroup = function removeGroup(req, res) {
  var gid, response;
  return regeneratorRuntime.async(function removeGroup$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          gid = req.params.id;

          if (!gid) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(Group.findOneAndDelete({
            id: gid
          }).then(function () {
            return res.status(200).send({
              status: "Group deleted successfully"
            });
          })["catch"](function (err) {
            return res.status(500).send({
              message: "Internal Server Error"
            });
          }));

        case 4:
          response = _context3.sent;

        case 5:
          return _context3.abrupt("return", res.status(400).send({
            message: "Invalid Request"
          }));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getOneGroup = function getOneGroup(req, res) {
  var gid, response;
  return regeneratorRuntime.async(function getOneGroup$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          gid = req.params.id;

          if (!gid) {
            _context4.next = 5;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(Group.findOne({
            id: gid
          }).then(function () {
            return res.status(200).send({
              status: "Successfully retrieve group"
            });
          })["catch"](function (err) {
            return res.status(500).send({
              message: "Internal Server Error"
            });
          }));

        case 4:
          response = _context4.sent;

        case 5:
          return _context4.abrupt("return", res.status(400).send({
            message: "Invalid Request"
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  createGroup: createGroup,
  getAllGroup: getAllGroup,
  removeGroup: removeGroup,
  getOneGroup: getOneGroup
};
//# sourceMappingURL=group.controller.dev.js.map
