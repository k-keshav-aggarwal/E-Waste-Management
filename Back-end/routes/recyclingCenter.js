const express = require("express");
const Router = express.Router();
const { getCenters, createCenter, deleteCenter } = require("../controllers/recyclingCenter.js");

Router.route("/").get(getCenters).post(createCenter);
Router.route("/:id").delete(deleteCenter);

module.exports = Router;