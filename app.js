"use strict";

const express = require("express");
require('dotenv').config()
const adapter = require("./alexa-handler")

let app = express();

let router = express.Router();

router.get("/v1/healthcheck", (req, res) => {
    res.status(200).json({ "message": "ok" });
});

router.post("", adapter.getRequestHandlers());


app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = app;