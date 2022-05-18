// Project endpoint object

let appData = {};

// Require dependencies

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an app instance

const app = express();

// Include middleware / dependencies

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Define the static / main folder

app.use(express.static("website"));

// Create the post route

app.post("/create", (req, res) => {

    appData = req.body;
    res.status(200).send(appData);

});

// Create the get route

app.get("/request", (req, res) => {

    res.status(200).send(appData);

});

// Spin up a server and test it

const port = 3000;

app.listen(port, () => {

    console.log("The server is running on http://localhost:" + port);

});