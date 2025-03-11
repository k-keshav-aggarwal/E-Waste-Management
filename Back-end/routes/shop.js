const express = require("express");
const Router = express.Router();
const { getItems } = require("../controllers/shop.js");

Router.route("/").get(getItems);

module.exports = Router;
