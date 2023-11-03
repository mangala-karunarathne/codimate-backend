const express = require("express");
const app = express();
const employerRoutes = require("./employerRoutes");

app.use("/employers", employerRoutes);

module.exports = app;