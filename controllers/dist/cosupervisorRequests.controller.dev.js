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
            researchField: researchField
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

var getAllRequestTopic = function getAllRequestTopic(req, res) {
  var response;
  return regeneratorRuntime.async(function getAllRequestTopic$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(CoSupervisorRequest.find());

        case 3:
          response = _context2.sent;

          if (!response) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(200).send({
            message: "get all request topic",
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
            message: "error while getting request topic"
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var getAllRequestsofCoSupervisor = function getAllRequestsofCoSupervisor(req, res) {
  var cosupervisor, response;
  return regeneratorRuntime.async(function getAllRequestsofCoSupervisor$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          cosupervisor = req.params.name;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(CoSupervisorRequest.find({
            supervisor: cosupervisor
          }));

        case 4:
          response = _context3.sent;

          if (!response) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.json(response));

        case 9:
          return _context3.abrupt("return", res.status(404).send({
            message: 'Error on retrieving request list of Co-supervisors'
          }));

        case 10:
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var getOneRequest = function getOneRequest(req, res) {
  var groupId, response;
  return regeneratorRuntime.async(function getOneRequest$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          groupId = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(CoSupervisorRequest.findOne({
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
          return _context4.abrupt("return", res.status(404).send({
            message: 'No such request available'
          }));

        case 10:
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var updateCoSupervisorRequest = function updateCoSupervisorRequest(req, res) {
  var groupId, updateCoSupervisorRequest, response;
  return regeneratorRuntime.async(function updateCoSupervisorRequest$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          groupId = req.params.id;
          updateCoSupervisorRequest = {
            groupId: req.body.groupId,
            email: req.body.email,
            researchTopic: req.body.researchTopic,
            researchField: req.body.researchField,
            coSupervisor: req.body.coSupervisor
          };
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(CoSupervisorRequest.findOneAndUpdate({
            groupId: groupId
          }, updateCoSupervisorRequest));

        case 5:
          response = _context5.sent;

          if (!response) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(200).send({
            message: 'Successfully updated Supervisor request'
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
            message: 'Unable to update'
          }));

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 13]]);
}; // const deleteCoSupervisorRequest = async (req, res) => {
//     const groupId = req.params.id;
//     try {
//         const response = await Group.findOneAndDelete({ groupId: groupId });
//         if (response) {
//             return res.status(204).send({ message: 'Successfully deleted a Request' });
//         } else {
//             return res.status(500).send({ message: 'Internal server error' });
//         }
//     } catch (err) {
//         return res.status(400).send({ message: 'Could not delete the request' })
//     }
// }


module.exports = {
  createCoSupervisorRequest: createCoSupervisorRequest,
  getAllRequestTopic: getAllRequestTopic,
  getAllRequestsofCoSupervisor: getAllRequestsofCoSupervisor,
  getOneRequest: getOneRequest,
  updateCoSupervisorRequest: updateCoSupervisorRequest
};
//# sourceMappingURL=cosupervisorRequests.controller.dev.js.map
