"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bcrypt = require('bcryptjs');

var _require = require('express'),
    request = _require.request;

var auth = require('../middlewares/jwt');

var User = require('../models/user.model');

var register = function register(req, res) {
  var fullname, studentId, email, contactNo, degree, pwd, role, groupId, isAvailable, department, field, salt, password, user, response;
  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fullname = req.body.fullname;
          studentId = req.body.studentId;
          email = req.body.email;
          contactNo = req.body.contactNo;
          degree = req.body.degree;
          pwd = req.body.password;
          role = req.body.role;
          groupId = req.body.groupId;
          isAvailable = req.body.isAvailable;
          department = req.body.department;
          field = req.body.field;
          salt = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(pwd, salt);
          user = new User({
            fullname: fullname,
            studentId: studentId,
            email: email,
            contactNo: contactNo,
            degree: degree,
            password: password,
            role: role,
            groupId: groupId,
            isAvailable: isAvailable,
            department: department,
            field: field
          });
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          response = _context.sent;

          if (!response) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", res.status(201).send({
            message: 'New User registered'
          }));

        case 22:
          return _context.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](14);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send({
            message: 'Error while registering a user'
          }));

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[14, 25]]);
};

var login = function login(req, res) {
  var email, password, user, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context2.sent;

          if (!user) {
            _context2.next = 15;
            break;
          }

          if (!(user && bcrypt.compareSync(password, user.password))) {
            _context2.next = 12;
            break;
          }

          token = auth.generateAccessToken(email); // call toJSON method applied during model instantiation

          return _context2.abrupt("return", res.status(200).send(_objectSpread({}, user.toJSON(), {
            token: token
          })));

        case 12:
          return _context2.abrupt("return", res.status(400).send({
            message: 'Such user does not exist check your credentials'
          }));

        case 13:
          _context2.next = 16;
          break;

        case 15:
          return _context2.abrupt("return", res.status(404).send({
            message: 'Such user does not exist'
          }));

        case 16:
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(400).send({
            message: 'Such user does not exist check your credentials'
          }));

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 18]]);
};

var getAllUsers = function getAllUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getAllUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context3.sent;

          if (!users) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.json(users));

        case 8:
          return _context3.abrupt("return", res.status(404).send({
            message: 'Error on retrieving users'
          }));

        case 9:
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var getOneUser = function getOneUser(req, res) {
  var email, user;
  return regeneratorRuntime.async(function getOneUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = req.params.email;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context4.sent;

          if (!user) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.json(user));

        case 9:
          return _context4.abrupt("return", res.status(404).send({
            message: 'No such user found'
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

var updateUserPassword = function updateUserPassword(req, res) {
  var email, password, user, salt, updatePassword, newUser, response;
  return regeneratorRuntime.async(function updateUserPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = req.params.email;
          password = req.params.pwd;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context5.sent;

          if (!user) {
            _context5.next = 26;
            break;
          }

          salt = bcrypt.genSaltSync(10);
          updatePassword = bcrypt.hashSync(password, salt);
          newUser = {
            fullname: user.fullname,
            studentId: user.studentId,
            email: user.email,
            contactNo: user.contactNo,
            degree: user.degree,
            password: updatePassword,
            role: user.role,
            groupId: user.groupId,
            isAvailable: user.isAvailable,
            department: user.department,
            field: user.field
          };
          _context5.prev = 10;
          _context5.next = 13;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            email: email
          }, newUser));

        case 13:
          response = _context5.sent;

          if (!response) {
            _context5.next = 18;
            break;
          }

          return _context5.abrupt("return", res.status(200).send({
            message: 'Successfully updated Password'
          }));

        case 18:
          return _context5.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 19:
          _context5.next = 24;
          break;

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](10);
          return _context5.abrupt("return", res.status(400).send({
            message: 'Unable to update recheck your email'
          }));

        case 24:
          _context5.next = 27;
          break;

        case 26:
          return _context5.abrupt("return", res.status(404).send({
            message: 'No such user with entered email'
          }));

        case 27:
          _context5.next = 32;
          break;

        case 29:
          _context5.prev = 29;
          _context5.t1 = _context5["catch"](2);
          return _context5.abrupt("return", res.status(404).send({
            message: 'No such user with entered email'
          }));

        case 32:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 29], [10, 21]]);
};

var updateUser = function updateUser(req, res) {
  var email, user, password, newUser, response;
  return regeneratorRuntime.async(function updateUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          email = req.params.email;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context6.sent;
          password = user.password;
          newUser = {
            fullname: req.body.fullname,
            studentId: req.body.studentId,
            email: req.body.email,
            contactNo: req.body.contactNo,
            degree: req.body.degree,
            password: password,
            role: req.body.role,
            groupId: req.body.groupId,
            isAvailable: req.body.isAvailable,
            department: req.body.department,
            field: req.body.field
          };
          _context6.prev = 6;
          _context6.next = 9;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            email: email
          }, newUser));

        case 9:
          response = _context6.sent;

          if (!response) {
            _context6.next = 14;
            break;
          }

          return _context6.abrupt("return", res.status(200).send({
            message: 'Successfully updated User Details'
          }));

        case 14:
          return _context6.abrupt("return", res.status(500).send({
            message: 'Internal server error'
          }));

        case 15:
          _context6.next = 20;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](6);
          return _context6.abrupt("return", res.status(400).send({
            message: 'Unable to update recheck your email'
          }));

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 17]]);
};

var deleteUser = function deleteUser(req, res) {
  var email, user;
  return regeneratorRuntime.async(function deleteUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          email = req.params.email;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(User.findOneAndDelete({
            email: email
          }));

        case 4:
          user = _context7.sent;

          if (!user) {
            _context7.next = 9;
            break;
          }

          return _context7.abrupt("return", res.status(204).send({
            message: 'Successfully deleted A User'
          }));

        case 9:
          return _context7.abrupt("return", res.status(404).send({
            message: 'Such user does not exists recheck the email'
          }));

        case 10:
          _context7.next = 15;
          break;

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var getAllUsersChat = function getAllUsersChat(req, res, next) {
  var groupId, users;
  return regeneratorRuntime.async(function getAllUsersChat$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          groupId = req.params.groupId;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(User.find({
            $and: [{
              _id: {
                $ne: req.params.id
              }
            }, {
              groupId: groupId
            }]
          }).select(["email", "fullname", "_id", "groupId"]));

        case 4:
          users = _context8.sent;
          return _context8.abrupt("return", res.json(users));

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          next(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var searchName = function searchName(req, res) {
  var name, user;
  return regeneratorRuntime.async(function searchName$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          name = req.params.name;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            fullname: name
          }));

        case 4:
          user = _context9.sent;

          if (!user) {
            _context9.next = 9;
            break;
          }

          return _context9.abrupt("return", res.json(user));

        case 9:
          return _context9.abrupt("return", res.status(404).send({
            message: 'Such user does not exists recheck the email'
          }));

        case 10:
          _context9.next = 15;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](1);
          return _context9.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var updateSupervisor = function updateSupervisor(req, res) {
  var supervisor, fullname, response;
  return regeneratorRuntime.async(function updateSupervisor$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          supervisor = req.params.supervisor;
          fullname = req.params.name;
          _context10.prev = 2;
          _context10.next = 5;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            fullname: fullname
          }, {
            $set: {
              "supervisor": supervisor
            }
          }));

        case 5:
          response = _context10.sent;
          console.log(response);

          if (!response) {
            _context10.next = 9;
            break;
          }

          return _context10.abrupt("return", res.json(response));

        case 9:
          _context10.next = 14;
          break;

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](2);
          console.log("error while updating user>>", _context10.t0);

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

var updateCoSupervisor = function updateCoSupervisor(req, res) {
  var cosupervisor, fullname, response;
  return regeneratorRuntime.async(function updateCoSupervisor$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          cosupervisor = req.params.cosupervisor;
          fullname = req.params.name;
          _context11.prev = 2;
          _context11.next = 5;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            fullname: fullname
          }, {
            $set: {
              "cosupervisor": cosupervisor
            }
          }));

        case 5:
          response = _context11.sent;

          if (!response) {
            _context11.next = 8;
            break;
          }

          return _context11.abrupt("return", res.status(200).send({
            message: 'Updated user'
          }));

        case 8:
          _context11.next = 13;
          break;

        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](2);
          console.log("error while updating user>>", _context11.t0);

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[2, 10]]);
};

var getOneUserName = function getOneUserName(req, res) {
  var email, user;
  return regeneratorRuntime.async(function getOneUserName$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          email = req;
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context12.sent;

          if (!user) {
            _context12.next = 9;
            break;
          }

          return _context12.abrupt("return", user);

        case 9:
          return _context12.abrupt("return", res.status(404).send({
            message: 'No such user found'
          }));

        case 10:
          _context12.next = 15;
          break;

        case 12:
          _context12.prev = 12;
          _context12.t0 = _context12["catch"](1);
          return _context12.abrupt("return", res.status(500).send({
            message: 'Internal Server Error'
          }));

        case 15:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

module.exports = {
  register: register,
  login: login,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  updateUserPassword: updateUserPassword,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllUsersChat: getAllUsersChat,
  searchName: searchName,
  updateSupervisor: updateSupervisor,
  updateCoSupervisor: updateCoSupervisor,
  getOneUserName: getOneUserName
};
//# sourceMappingURL=user.controller.dev.js.map
