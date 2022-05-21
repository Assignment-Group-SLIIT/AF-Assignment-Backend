const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

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