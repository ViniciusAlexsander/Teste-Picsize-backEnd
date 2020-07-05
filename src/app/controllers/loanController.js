const moment = require("moment");
const fs = require("fs");
const data = require("../../../data.json");

module.exports = {
  create(req, res) {
    try {
      const {
        cpf,
        uf,
        birth,
        requestedAmount,
        deadlinesMonths,
        taxPerMonth,
        totalPayable,
      } = req.body;

      let simulationDay = moment().format();
      let lastId;

      if (data.loans[0] == undefined) {
        lastId = 0;
      } else {
        lastId = data.loans[data.loans.length - 1].id;
      }

      const id = Number(lastId + 1);

      data.loans.push({
        id,
        cpf,
        uf,
        birth,
        requestedAmount,
        deadlinesMonths,
        totalPayable,
        taxPerMonth,
        simulationDay,
      });

      fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err)
          return res.status(400).json({
            error:
              "Algum erro inesperado aconteceu, tente novamente mais tarde!",
          });
        return res.json({ id });
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({});
    }
  },
  index(req, res) {
    try {
      return res.json({ data });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: "Algum erro inesperado aconteceu, tente novamente mais tarde!",
      });
    }
  },
};
