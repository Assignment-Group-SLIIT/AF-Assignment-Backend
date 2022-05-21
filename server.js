const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const unless = require('express-unless')
const auth = require('./middlewares/jwt');
const errors = require('./middlewares/errorHandler')

const port = process.env.PORT || 4000;
const URL = process.env.URL;

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindandModify: false
});

// auth.authenticateToken.unless = unless
// app.use(auth.authenticateToken.unless({
//     path: [
//         { url: '/api/v1/users/login', methods: ['POST'] },
//         { url: '/api/v1/users/register', methods: ['POST'] }
//     ]
// }))


app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

//template route
let templates = require('./routes/template.route')
app.use('/api/v1/templates', templates)

//users route
let users = require('./routes/user.route')
app.use('/api/v1/users', users);
app.use(errors.errorHandler);

//supervisor-requests route
let supervisors = require('./routes/supervisorRequests.route')
app.use('/api/v1/supervisors', supervisors);

//projectpropsal route
let projectproposals = require('./routes/projectProposal.route')
app.use('/api/v1/projectproposals', projectproposals)

//assignment route
let assignments = require('./routes/assignment.route')
app.use('/api/v1/assignments', assignments)
//group route
let groups = require('./routes/group.route');
app.use('/api/v1/groups', groups)

//co supervisor request topic route
let coSupervisorRequestTopics = require('./routes/cosupervisorRequests.route');
app.use('/api/v1/requestTopicsCoSupervisors', coSupervisorRequestTopics)

//submission route
let submission = require('./routes/submission.route')
app.use('/api/v1/submissions', submission)

//panel route
let Panels = require('./routes/panel.route')
app.use('/api/v1/panels', Panels)