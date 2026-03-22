const express = require("express");
const mainRoutes = express(); // define our app using express


mainRoutes.use("/user", require("./userRoutes"));
mainRoutes.use("/auth", require("./auth.routes"))
mainRoutes.use("/role-permission", require("./role-permission.routes"))

module.exports = mainRoutes;
