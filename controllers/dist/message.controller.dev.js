"use strict";

var Message = require("../models/message.model");

var getMessages = function getMessages(req, res, next) {
  var _req$body, from, to, messages, projectedMessages;

  return regeneratorRuntime.async(function getMessages$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, from = _req$body.from, to = _req$body.to;
          console.log(from);
          _context.next = 5;
          return regeneratorRuntime.awrap(Message.find({
            users: {
              $all: [from, to]
            }
          }).sort({
            updatedAt: 1
          }));

        case 5:
          messages = _context.sent;
          projectedMessages = messages.map(function (msg) {
            return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message.text
            };
          });
          res.json(projectedMessages);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var addMessage = function addMessage(req, res, next) {
  var _req$body2, users, sender, message, response;

  return regeneratorRuntime.async(function addMessage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, users = _req$body2.users, sender = _req$body2.sender, message = _req$body2.message;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Message.create({
            message: {
              text: message
            },
            users: users,
            sender: sender
          }));

        case 4:
          response = _context2.sent;

          if (!response) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.json({
            msg: "Message added successfully."
          }));

        case 9:
          return _context2.abrupt("return", res.json({
            msg: "Failed to add message to the database"
          }));

        case 10:
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = {
  getMessages: getMessages,
  addMessage: addMessage
};
//# sourceMappingURL=message.controller.dev.js.map
