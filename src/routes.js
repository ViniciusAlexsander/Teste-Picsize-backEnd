const express = require("express");
const routes = express.Router();

const formController = require("./app/controllers/formController");
const loanController = require("./app/controllers/loanController");

routes.get("/", (req, res) => res.send("Ola Mundo!"));

//exibe o form para pegar os dados necessario para a simulação
routes.post("/form", formController.index);

//exibe o form com o resultado da simulação e salva em um banco de dados os dados, caso o usuario aceite a simulação
routes.post("/loan-simulation", loanController.create);

module.exports = routes;
