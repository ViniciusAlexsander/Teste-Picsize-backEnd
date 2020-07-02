const express = require("express");
const routes = express.Router();

const formController = require("./controllers/formController");
// const loanController = require("./controllers/loanController");

routes.post("/", formController.index);

// routes.get("/loan-simulation", loanController.index);
// routes.post("/loan-simulation", loanController.create);

module.exports = routes;
