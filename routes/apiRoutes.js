const express = require("express");
const app = express();
const userRoutes = require("./userRoutes");

app.use("/users", userRoutes);

module.exports = app;