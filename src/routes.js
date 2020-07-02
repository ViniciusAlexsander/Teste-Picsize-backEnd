const express = require("express");
const routes = express.Router();

const formController = require("./app/controllers/formController");
const loanController = require("./app/controllers/loanController");

routes.post("/", formController.index);

routes.get("/loan-simulation", loanController.index);
routes.post("/loan-simulation", loanController.create);

module.exports = routes;
