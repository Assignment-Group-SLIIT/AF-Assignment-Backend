"use strict";

var express = require("express");

var mongoose = require("mongoose");

var cors = require("cors");

require("dotenv").config();

var app = express();
var port = process.env.PORT || 4000;
var URL = process.env.URL;
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.json());
mongoose.connect(URL, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true // useFindandModify: false

});
app.listen(port, function () {
  console.log("Server Is Running on Port: ".concat(port));
});
var connection = mongoose.connection;
connection.once("open", function () {
  console.log("Mongodb Connection success!");
}); //template route

var templates = require('./routes/template.route');

app.use('/api/v1/templates', templates); //group route

var group = require('./routes/group.route');

app.use('/api/v1/groups', group); //co supervisor request topic route

var coSupervisorRequestTopic = require('./routes/cosupervisorRequests.route');

app.use('/api/v1/requestTopic', coSupervisorRequestTopic);
//# sourceMappingURL=server.dev.js.map
